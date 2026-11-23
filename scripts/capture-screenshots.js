/* Generates local, fast-loading screenshots for every project in js/data.js
   Usage (run once on your computer, needs Node 18+):
     npm init -y && npm i playwright && npx playwright install chromium
     node scripts/capture-screenshots.js            # all projects
     node scripts/capture-screenshots.js tasq-io    # only one slug
   Output: images/projects/<slug>.jpg (header) and <slug>-full.jpg (long page) */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const { PROJECTS } = require("../js/data.js");
const out = path.join(__dirname, "..", "images", "projects");
const slug = u => new URL(u).hostname.replace(/^www\./, "").replace(/\./g, "-");
const only = process.argv[2];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 });
  for (const p of PROJECTS) {
    const s = slug(p.url); if (only && only !== s) continue;
    const page = await ctx.newPage();
    try {
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
      await page.waitForTimeout(2500);
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); }); // trigger lazy-load
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(out, s + ".jpg"), type: "jpeg", quality: 78, clip: { x: 0, y: 0, width: 1366, height: 860 } });
      await page.screenshot({ path: path.join(out, s + "-full.jpg"), type: "jpeg", quality: 70, fullPage: true, clip: undefined });
      console.log("ok   ", s);
    } catch (e) { console.log("FAIL ", s, e.message); }
    await page.close();
  }
  await browser.close();
})();
