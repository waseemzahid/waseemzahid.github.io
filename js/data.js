/* =====================================================================
   PROJECT DATA: edit this file to add, remove or re-categorise projects.
   Format: { name, url, cat, tech }
   Images are looked up automatically by slug (the domain name):
     images/projects/<slug>.jpg        -> header image (card)
     images/projects/<slug>-full.jpg   -> long full-page image (popup)
   If an image is missing, a styled placeholder card is shown (never a blank page).
   To replace an image, just overwrite that file (same name).
   Run `npm run detect` to auto-check every site's platform (see README).
   ===================================================================== */
const CATS = { WP: "WordPress", WC: "WooCommerce", SH: "Shopify", RX: "React / Next / MERN" };
const PROJECTS = [
  // ---- WordPress ----
  { name: "Personal Drivers", url: "https://www.personaldrivers.com/", cat: CATS.WP, tech: ["WordPress"], featured: true, desc: "Custom WordPress website for Personal Drivers, built for a clean, fast and easy-to-navigate experience." },
  { name: "Farm Journal", url: "https://www.farmjournal.com/", cat: CATS.WP, tech: ["WordPress"], featured: true, desc: "Large content-driven WordPress website for Farm Journal, with custom development and performance work." },
  { name: "A Day Well Planned", url: "https://adaywellplanned.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "StratSkye", url: "https://stratskye.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Midnight Blue Walrus", url: "https://midnightblue-walrus-300921.hostingersite.com/", cat: CATS.WP, tech: ["WordPress", "Elementor"] },
  { name: "KT Hendersons", url: "https://plum-albatross-877359.hostingersite.com/", cat: CATS.WP, tech: ["WordPress", "Elementor"], featured: true, desc: "WordPress and Elementor build for KT Hendersons, with a polished, responsive design." },
  { name: "HyperRank Media", url: "https://hyperrankmedia.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Linen Seal", url: "https://linen-seal-918653.hostingersite.com/", cat: CATS.WP, tech: ["WordPress", "Elementor"] },
  { name: "Skin Savvy DA", url: "https://skinsavvyda.com/", cat: CATS.WP, tech: ["WordPress", "Elementor"] }, // verified: WordPress
  { name: "Venture Elevate", url: "https://venturelevate.com/", cat: CATS.WP, tech: ["WordPress", "Elementor"] }, // verified: WordPress/Elementor
  { name: "i-Enhance", url: "https://i-enhance.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "RCP Solutions", url: "https://rcpsolutions1.co.uk/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "RJW Clearance & Maintenance", url: "https://rjwclearancemaintenance.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Mary's Cleaning Service", url: "https://maryscleaningservice.co.uk/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Gutter Geeks Liverpool", url: "https://guttergeeksliverpool.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "G2S Accountants", url: "https://g2saccountants.co.uk/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Kitchen 3D", url: "https://kitchen3d.co.uk/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Krypton Nationwide", url: "https://kryptonnationwide.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "NexGen Plumbing & Heating", url: "https://nexgenplumbingandheating.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "The Acc Tax Co", url: "https://theacctaxco.com/", cat: CATS.WP, tech: ["WordPress"] },
    { name: "Sadiq Gelatin", url: "https://www.sadiqgelatin.com/", cat: CATS.WP, tech: ["WordPress"] },
  { name: "Mehreen Qazafi", url: "http://mehreenqazafi.com/", cat: CATS.WC, tech: ["WordPress", "WooCommerce"] },
  // ---- WooCommerce (best guess: please verify) ----
  { name: "3S Advanced Shoppes", url: "http://3sadvancedshoppes.ca/", cat: CATS.WC, tech: ["WordPress", "WooCommerce"] }, // verified: WooCommerce
  // ---- Shopify ----
    { name: "Shop Kollekt", url: "https://www.shopkollekt.com/", cat: CATS.SH, tech: ["Shopify"] }, // verified: Shopify
    { name: "Roseland Designs", url: "https://www.roselanddesigns.com/", cat: CATS.SH, tech: ["Shopify"] },
{ name: "The Postpartum Edit", url: "https://www.thepostpartumedit.com/", cat: CATS.SH, tech: ["Shopify"] },
{ name: "Supreme Bee Honey", url: "https://supremebeehoney.com/", cat: CATS.SH, tech: ["Shopify"] },
{ name: "Massage in a Jar", url: "https://q5u0ds-hf.myshopify.com/", cat: CATS.SH, tech: ["Shopify"] },
{ name: "Anza Life", url: "https://anzalife.store/", cat: CATS.SH, tech: ["Shopify"] },
{ name: "Falaj", url: "https://falaj.store/", cat: CATS.SH, tech: ["Shopify"] },
  { name: "Mtech Motorcycles", url: "https://www.mtechmotorcycles.com/", cat: CATS.WP, tech: ["WordPress"] },
  // ---- React / Next / MERN ----
  { name: "What The Truck", url: "https://www.whatthetruck.live/", cat: CATS.RX, tech: ["React", "Next.js"], featured: true, desc: "Modern React / Next.js web app for What The Truck, a live, real-time experience." },
  { name: "Tasq", url: "https://tasq.io/", cat: CATS.RX, tech: ["React", "Next.js"] }, // client-rendered app (React-type)
  
  { name: "NSF Freights", url: "https://www.nsfreights.com/", cat: CATS.RX, tech: ["React", "Node.js"] },
  // ---- your own React / Next / MERN apps (edit desc / tech freely; featured:true shows in "Featured Apps") ----
  { name: "MERN Chat App", url: "https://mern-chat-app-189n.onrender.com/login", cat: CATS.RX, tech: ["MongoDB", "Express", "React", "Node.js"],  desc: "Full stack MERN chat application with user authentication." },
  { name: "Amazon Pro", url: "https://amazonpro-chi.vercel.app/", cat: CATS.RX, tech: ["React"],  desc: "E-commerce storefront UI inspired by Amazon." },
  { name: "Netflix Clone", url: "https://netflix-clone-psi-three-66.vercel.app", cat: CATS.RX, tech: ["React"],  desc: "Streaming-platform style interface with a login screen." },
  { name: "Medicare Booking", url: "https://medicare-booking-frontend.vercel.app/", cat: CATS.RX, tech: ["React"], desc: "Doctor appointment booking interface for patients." },
  { name: "Home Interior", url: "https://home-interior-three.vercel.app/", cat: CATS.RX, tech: ["React"], desc: "Modern, responsive interior design showcase website." },
  { name: "Edusity", url: "https://edusity-nu.vercel.app/", cat: CATS.RX, tech: ["React"], desc: "Education / university landing website." },
  { name: "Virtual Reality", url: "https://virtualreality-nine.vercel.app/", cat: CATS.RX, tech: ["React"], desc: "Immersive virtual-reality themed landing page." }
  // Add your React / MERN projects from your old portfolio here, e.g.:
  // , { name: "My MERN App", url: "https://example.com", cat: CATS.RX, tech: ["MongoDB", "Express", "React", "Node.js"] }
];
const SKILLS = [ // n = label, i = file in images/tech/<i>.svg (real brand logos, bundled locally); i:"" shows a </> glyph
  { n: "WordPress", i: "wordpress" }, { n: "WooCommerce", i: "woocommerce" }, { n: "Shopify", i: "shopify" },
  { n: "React.js", i: "react" }, { n: "Next.js", i: "nextjs" }, { n: "Node.js", i: "nodejs" },
  { n: "Express.js", i: "express" }, { n: "MongoDB", i: "mongodb" }, { n: "Redux Toolkit", i: "redux" },
  { n: "WebSocket", i: "socketio" }, { n: "WebRTC", i: "webrtc" }, { n: "Tailwind CSS", i: "tailwindcss" },
  { n: "Material UI", i: "materialui" }, { n: "Bootstrap", i: "bootstrap" }, { n: "JavaScript", i: "javascript" },
  { n: "Firebase", i: "firebase" }, { n: "HTML5", i: "html5" }, { n: "PHP", i: "php" },
  { n: "Plugin Development", i: "plugin" }, { n: "Theme Development", i: "theme" }
];
const ROLES = ["Full Stack WordPress Developer", "React & Next.js Developer", "MERN Stack Developer", "Shopify & WooCommerce Builder"];
if (typeof module !== "undefined") module.exports = { PROJECTS };
