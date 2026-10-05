/**
 * Regenerates src/assets/sagar-portrait-cutout.webp from the original portrait by keying out its
 * orange background (ratio-space chroma key + projection matting on edge pixels).
 * Needs sharp (not a project dependency):  npx -y -p sharp node scripts/make-portrait-cutout.cjs  *   src/assets/sagar-portrait.webp src/assets/sagar-portrait-cutout.webp <preview-dir>
 */
// Chroma-key the portrait's orange background → transparent cutout + review composites.
const sharp = require('sharp')
const [SRC, OUT, PREVIEW_DIR] = process.argv.slice(2)
const BG = [243, 67, 19]
const T0 = 0.05 // ratio-distance at/below which a pixel is pure background
const T1 = 0.2 // at/above which it is fully foreground

;(async () => {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height, N = W * H
  const dist = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const r = Math.max(1, data[i * 3]), g = data[i * 3 + 1], b = data[i * 3 + 2]
    dist[i] = r < 90 ? 9 : Math.hypot(g / r - 0.276, b / r - 0.078) // dark pixels are never background
  }
  // Flood fill from the border through background-like pixels only.
  const reached = new Uint8Array(N)
  const stack = []
  const push = (i) => { if (!reached[i] && dist[i] < T1) { reached[i] = 1; stack.push(i) } }
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x) }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1) }
  // Also seed enclosed pockets of pure background (e.g. gaps between curls) — never present in skin/lips.
  for (let i = 0; i < N; i++) if (dist[i] < 0.03) push(i)
  while (stack.length) {
    const i = stack.pop(), x = i % W, y = (i / W) | 0
    if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W)
  }
  // Fringe band: pixels within BAND px of clearly-transparent background get a wider ramp,
  // so background bleed on hair tips / shirt edges is un-mixed instead of left as an orange rim.
  const BAND = 3, T1_BAND = 0.42
  const near = new Uint8Array(N)
  let frontier = []
  for (let i = 0; i < N; i++) if (reached[i] && dist[i] < (T0 + T1) / 2) { near[i] = 1; frontier.push(i) }
  for (let k = 0; k < BAND; k++) {
    const next = []
    for (const i of frontier) {
      const x = i % W, y = (i / W) | 0
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && !near[j]) { near[j] = 1; next.push(j) }
    }
    frontier = next
  }
  const out = Buffer.alloc(N * 4)
  for (let i = 0; i < N; i++) {
    let a = 1
    if (reached[i]) a = Math.min(1, Math.max(0, (dist[i] - T0) / (T1 - T0)))
    let F = null
    if (near[i] && a > 0) {
      // Matte by projection: P = a·F + (1−a)·BG, with F = nearest true-interior colour.
      const x = i % W, y = (i / W) | 0
      let best = 1e9
      for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
        const xx = x + dx, yy = y + dy
        if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue
        const j = yy * W + xx
        if (reached[j] || near[j]) continue
        const dd = dx * dx + dy * dy
        if (dd < best) { best = dd; F = [data[j * 3], data[j * 3 + 1], data[j * 3 + 2]] }
      }
      if (F) {
        let num = 0, den = 0
        for (let c = 0; c < 3; c++) { const fb = F[c] - BG[c]; num += (data[i * 3 + c] - BG[c]) * fb; den += fb * fb }
        a = den > 400 ? Math.min(1, Math.max(0, num / den)) : Math.min(a, Math.max(0, (dist[i] - T0) / (T1_BAND - T0)))
      } else a = Math.min(a, Math.max(0, (dist[i] - T0) / (T1_BAND - T0)))
    }
    // Colour: interior colour for matted edge pixels, otherwise un-mix the known background.
    for (let c = 0; c < 3; c++) {
      const p = data[i * 3 + c]
      out[i * 4 + c] = F ? F[c] : a > 0.02 ? Math.max(0, Math.min(255, (p - (1 - a) * BG[c]) / a)) : 0
    }
    out[i * 4 + 3] = Math.round(a * 255)
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(OUT)

  // Review composites over sky blue: full image + zoomed edge crops.
  const sky = await sharp({ create: { width: W, height: H, channels: 4, background: '#9fd6f5' } }).png().toBuffer()
  const comp = await sharp(sky).composite([{ input: OUT }]).png().toBuffer()
  await sharp(comp).resize(540).toFile(`${PREVIEW_DIR}/cut-full.png`)
  const crops = { hair: [300, 20, 420, 220], ear: [330, 230, 120, 160], shoulderL: [20, 480, 260, 300], armR: [880, 820, 200, 320], chin: [430, 380, 200, 120] }
  for (const [n, [x, y, w, h]] of Object.entries(crops)) {
    await sharp(comp).extract({ left: x, top: y, width: w, height: h }).resize(w * 3, h * 3, { kernel: 'nearest' }).toFile(`${PREVIEW_DIR}/cut-${n}.png`)
  }
  const keyed = reached.reduce((s, v) => s + v, 0)
  console.log('done', OUT, 'keyed px', keyed, `(${((keyed / N) * 100).toFixed(1)}%)`)
})()
