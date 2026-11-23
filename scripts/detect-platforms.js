/* Auto-detects each site's platform and fixes `cat` in js/data.js
     npm run detect            -> prints a report only
     npm run detect -- --write -> also updates js/data.js
   Order: Shopify > WooCommerce > WordPress > React/Next. Sites it cannot classify are left unchanged. */
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const file = path.join(__dirname, "..", "js", "data.js");
const { PROJECTS } = require(file);
const write = process.argv.includes("--write");
const detect = html => {
  if (/cdn\.shopify\.com|Shopify\.theme|myshopify\.com/i.test(html)) return ["SH", "Shopify"];
  if (/woocommerce|wc-add-to-cart|add-to-cart=/i.test(html)) return ["WC", "WooCommerce"];
  if (/wp-content|wp-includes|name="generator" content="WordPress/i.test(html)) return ["WP", "WordPress"];
  if (/__NEXT_DATA__|_next\/static|id="__next"|data-reactroot|id="root"|react/i.test(html)) return ["RX", "React / Next / MERN"];
  return null;
};
(async () => {
  const browser = await chromium.launch(), ctx = await browser.newContext(); let src = fs.readFileSync(file, "utf8");
  for (const p of PROJECTS) {
    const page = await ctx.newPage();
    try {
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
      const html = await page.content(), d = detect(html);
      console.log((d ? d[1] : "unknown").padEnd(20), p.name, d && p.cat !== d[1] ? `  <-- was ${p.cat}` : "");
      if (write && d) src = src.replace(new RegExp(`(url: "${p.url.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&")}", cat: )CATS\\.\\w+`), `$1CATS.${d[0]}`);
    } catch (e) { console.log("FAIL".padEnd(20), p.name, e.message); }
    await page.close();
  }
  await browser.close();
  if (write) { fs.writeFileSync(file, src); console.log("js/data.js updated"); }
})();
