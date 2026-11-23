(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("js"); // content stays visible if animations ever fail
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ---------- helpers ---------- */
  const slug = u => new URL(u).hostname.replace(/^www\./, "").replace(/\./g, "-");
  const host = u => new URL(u).hostname.replace(/^www\./, "");
  const IMG = "images/projects/";
  // fallback chain when a local image is missing: screenshot services, then the styled placeholder
  const FB = (u, full) => [`https://image.thum.io/get/width/900/crop/${full ? 4500 : 1800}/noanimate/${u}`, `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=900&h=${full ? 3000 : 1800}`].join("|");
  const words = el => { el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w"><i>${w}</i></span>`).join(" "); };

  /* ---------- render ---------- */
  const techItem = s => `<span>${s.i ? `<img src="images/tech/${s.i}.svg" alt="" width="34" height="34" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('b'),{className:'gl',textContent:'</>'}))">` : `<b class="gl">&lt;/&gt;</b>`}${s.n}</span>`;
  $("#mq").innerHTML = [...SKILLS, ...SKILLS].map(techItem).join("");
  $("#big").innerHTML = "LET'S TALK".split("").map(c => `<i>${c === " " ? "&nbsp;" : c}</i>`).join("");
  $("#yr").textContent = new Date().getFullYear();
  $("#pc").dataset.n = PROJECTS.length; $("#trustn").textContent = PROJECTS.length + "+ live projects shown below";
  $(".chip.c3 b").textContent = PROJECTS.length + "+";
  const cats = ["All", ...Object.values(CATS)];
  $("#tabs").innerHTML = cats.map((c, i) => `<button class="tab mag${i ? "" : " on"}" data-c="${c}">${c} <small>${c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.cat === c).length}</small></button>`).join("");
  $("#grid").innerHTML = PROJECTS.map((p, i) => `
    <article class="card" data-c="${p.cat}" data-i="${i}" data-cursor="View" tabindex="0">
      <div class="shot"><div class="ph-card"><b>${p.name}</b><span>${host(p.url)}</span></div><img loading="lazy" decoding="async" alt="${p.name} homepage" src="${IMG}${slug(p.url)}.jpg" data-fb="${FB(p.url, false)}"></div>
      <div class="info"><h3>${p.name}</h3><p>${host(p.url)} <a class="vis" href="${p.url}" target="_blank" rel="noopener noreferrer">Visit ↗</a></p><div class="chips">${p.tech.map(t => `<em>${t}</em>`).join("")}</div></div>
    </article>`).join("");
  $$(".xp").forEach((x, i) => x.style.setProperty("--i", i));
  $("#feat").innerHTML = PROJECTS.filter(p => p.featured).map(p => `
    <article class="fcard rv" data-cursor="Demo">
      <div class="shot tall"><div class="ph-card"><b>${p.name}</b><span>${host(p.url)}</span></div><img loading="lazy" decoding="async" alt="${p.name} homepage" src="${IMG}${slug(p.url)}.jpg" data-fb="${FB(p.url, false)}"></div>
      <div class="fi"><div class="chips">${p.tech.map(t => `<em>${t}</em>`).join("")}</div><h3>${p.name}</h3><p>${p.desc || ""}</p>
      <div class="fb"><a class="btn p sm" href="${p.url}" target="_blank" rel="noopener noreferrer">Live demo ↗</a><button class="btn sm" data-i="${PROJECTS.indexOf(p)}">Preview</button></div></div>
    </article>`).join("");


  // local image first, then screenshot-service fallback
  document.addEventListener("load", e => { if (e.target.tagName === "IMG" && e.target.closest(".shot")) e.target.classList.add("ok"); }, true);
  document.addEventListener("error", e => {
    const im = e.target; if (im.tagName !== "IMG" || !im.closest(".shot")) return;
    const q = (im.dataset.fb || "").split("|").filter(Boolean);
    if (q.length) { im.dataset.fb = q.slice(1).join("|"); im.src = q[0]; } else im.style.display = "none"; // placeholder card stays
  }, true);

  /* ---------- modal (long full-page image) ---------- */
  const modal = $("#modal"), mi = $("#mi");
  const closeM = () => { modal.classList.remove("on"); document.body.classList.remove("lock"); };
  let list = [], pos = 0;
  const show = () => {
    const p = PROJECTS[list[pos]];
    $("#mt").textContent = p.name; $("#mu").href = p.url; $("#mu").dataset.u = p.url; $("#mc").textContent = `${pos + 1} / ${list.length}`;
    mi.dataset.fb = `${IMG}${slug(p.url)}.jpg|${FB(p.url, true)}`;
    mi.onerror = () => { const q = (mi.dataset.fb || "").split("|").filter(Boolean); if (q.length) { mi.dataset.fb = q.slice(1).join("|"); mi.src = q[0]; } else mi.onerror = null; };
    mi.src = `${IMG}${slug(p.url)}-full.jpg`; $(".mscroll").scrollTop = 0;
  };
  const openM = idx => { const act = $(".tab.on").dataset.c; list = PROJECTS.map((_, i) => i).filter(i => act === "All" || PROJECTS[i].cat === act); pos = Math.max(0, list.indexOf(idx)); show(); modal.classList.add("on"); document.body.classList.add("lock"); };
  const step = d => { pos = (pos + d + list.length) % list.length; show(); };
  $("#grid").addEventListener("click", e => { if (e.target.closest(".vis")) return; const c = e.target.closest(".card"); if (c) openM(+c.dataset.i); });
  $("#grid").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.classList.contains("card")) openM(+e.target.dataset.i); });
  $("#mu").addEventListener("click", e => { e.preventDefault(); window.open($("#mu").dataset.u, "_blank", "noopener,noreferrer"); });
  $("#mprev").onclick = () => step(-1); $("#mnext").onclick = () => step(1);
  $("#feat").addEventListener("click", e => { const b = e.target.closest("button[data-i]"); if (b) openM(+b.dataset.i); });
  $("#mclose").onclick = closeM; modal.onclick = e => e.target === modal && closeM();
  addEventListener("keydown", e => { if (!modal.classList.contains("on")) return; if (e.key === "Escape") closeM(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });

  /* ---------- tab filter ---------- */
  $("#tabs").addEventListener("click", e => {
    const t = e.target.closest(".tab"); if (!t) return;
    $$(".tab").forEach(x => x.classList.toggle("on", x === t));
    const cards = $$(".card");
    gsap.to(cards, { opacity: 0, y: 20, duration: .2, onComplete() {
      cards.forEach(c => c.style.display = (t.dataset.c === "All" || c.dataset.c === t.dataset.c) ? "" : "none");
      gsap.fromTo(cards.filter(c => c.style.display === ""), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: "power3.out", onComplete: () => ScrollTrigger.refresh() });
    } });
  });

  /* ---------- text splitting ---------- */
  $$(".split").forEach(words);
  $$(".hl > span").forEach(s => { s.innerHTML = `<i class="in">${s.textContent}</i>`; });

  /* ---------- cursor, magnetic, tilt, spotlight ---------- */
  const cur = $("#cursor"), lab = $("span", cur);
  const cx = gsap.quickTo(cur, "x", { duration: .25, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: .25, ease: "power3" });
  addEventListener("mousemove", e => {
    cur.style.opacity = 1; cx(e.clientX); cy(e.clientY);
    const pc = $("#pcard"); if (pc) gsap.to(pc, { rotationY: (e.clientX / innerWidth - .5) * 12, rotationX: -(e.clientY / innerHeight - .5) * 12, transformPerspective: 900, duration: .8 });
    gsap.to(".glow.g1", { x: e.clientX * .05, y: e.clientY * .05, duration: 1.5 });
    $$(".sym").forEach((s, i) => gsap.to(s, { x: (e.clientX / innerWidth - .5) * (40 + i * 25), y: (e.clientY / innerHeight - .5) * (40 + i * 20), duration: 1.2 }));
  });
  addEventListener("mousedown", () => gsap.fromTo(cur, { scale: 1 }, { scale: .6, yoyo: true, repeat: 1, duration: .12 }));
  document.addEventListener("mouseover", e => {
    const d = e.target.closest("[data-cursor]"), a = e.target.closest("a,button,input,textarea");
    cur.classList.toggle("big", !!d); cur.classList.toggle("sm", !d && !!a); if (d) lab.textContent = d.dataset.cursor;
  });
  $$(".mag").forEach(el => {
    el.addEventListener("mousemove", e => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .28, y: (e.clientY - r.top - r.height / 2) * .35, duration: .3 }); });
    el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)" }));
  });
  $$(".sc").forEach(c => c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(); c.style.setProperty("--x", e.clientX - r.left + "px"); c.style.setProperty("--y", e.clientY - r.top + "px"); }));
  $$(".card").forEach(c => {
    c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; gsap.to(c, { rotationY: x * 8, rotationX: -y * 8, transformPerspective: 900, duration: .3 }); });
    c.addEventListener("mouseleave", () => gsap.to(c, { rotationX: 0, rotationY: 0, duration: .6 }));
  });

  /* ---------- rotating role word in hero chip ---------- */
  let ri = 0; const rw = $("#rolew"), WORDS = ["WordPress", "React", "Next.js", "MERN", "Shopify"];
  setInterval(() => gsap.to(rw, { y: -10, opacity: 0, duration: .25, onComplete() { rw.textContent = WORDS[++ri % WORDS.length]; gsap.fromTo(rw, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .25 }); } }), 2200);

  /* ---------- side dots + menu ---------- */
  const secs = $$("section[data-label]");
  $("#dots").innerHTML = [["home", "Home"], ...secs.map(s => [s.id, s.dataset.label])].map(([id, l]) => `<li data-id="${id}" data-l="${l}"></li>`).join("");
  $("#dots").onclick = e => { const li = e.target.closest("li"); li && document.getElementById(li.dataset.id).scrollIntoView({ behavior: "smooth" }); };
  const setActive = id => { $$("#dots li").forEach(l => l.classList.toggle("on", l.dataset.id === id)); $$("#menu a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + id)); };
  [$("#home"), ...secs].forEach(s => ScrollTrigger.create({ trigger: s, start: "top 55%", end: "bottom 55%", onToggle: self => self.isActive && setActive(s.id) }));

  /* ---------- form -> mailto ---------- */
  $("#form").addEventListener("submit", e => {
    e.preventDefault(); const f = new FormData(e.target); toast("Opening your email app…");
    location.href = `mailto:waseemzahid64@gmail.com?subject=${encodeURIComponent("Portfolio enquiry from " + f.get("n"))}&body=${encodeURIComponent(f.get("m") + "\n\n" + f.get("n") + " (" + f.get("e") + ")")}`;
  });

  /* ---------- intro + scroll effects ---------- */
  const intro = () => {
    gsap.to(".hl .in", { y: 0, duration: 1.1, stagger: .15, ease: "expo.out" });
    gsap.from([".hero-l .pill", ".lead", ".hero-l .btns", ".trust"], { y: 28, opacity: 0, duration: .9, stagger: .12, delay: .4 });
    gsap.from(".pimg", { y: 60, opacity: 0, scale: .92, duration: 1.2, ease: "expo.out", delay: .3 });
    gsap.from("#wa", { scale: 0, y: 40, duration: .9, ease: "back.out(2)", delay: 1.6 });
    setTimeout(() => $("#wa").classList.add("tip"), 5000); setTimeout(() => $("#wa").classList.remove("tip"), 11000);
    gsap.from(".chip", { scale: 0, opacity: 0, duration: .7, stagger: .15, delay: 1, ease: "back.out(2)" });
  };
  const scrollFx = () => {
    const nav = $("#nav"); let last = 0;
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: s => { gsap.set("#progress", { scaleX: s.progress }); nav.classList.toggle("s", scrollY > 40); nav.classList.toggle("h", scrollY > last && scrollY > 500); last = scrollY; } });
    // hero parallax
    gsap.to(".hero-r", { yPercent: -10, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".wheel", { opacity: 0, scrollTrigger: { trigger: ".hero", start: "top top", end: "+=180", scrub: true } });
    // marquee reacts to scroll speed
    const mq = gsap.to("#mq", { xPercent: -50, repeat: -1, duration: 28, ease: "none" });
    ScrollTrigger.create({ onUpdate: s => { const v = Math.min(6, 1 + Math.abs(s.getVelocity()) / 400); gsap.to(mq, { timeScale: v, duration: .2, overwrite: true, onComplete: () => gsap.to(mq, { timeScale: 1, duration: 1.2 }) }); } });
    // headings + blocks + counters
    $$(".split").forEach(h => gsap.to($$("i", h), { y: 0, duration: 1, stagger: .05, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
    $$(".rv").forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
    $$("[data-n]").forEach(n => { const o = { v: 0 }; ScrollTrigger.create({ trigger: n, start: "top 92%", once: true, onEnter: () => gsap.to(o, { v: +n.dataset.n, duration: 1.8, ease: "power2.out", onUpdate: () => n.textContent = Math.round(o.v) + (n.dataset.s || "") }) }); });
    // project cards
    ScrollTrigger.batch(".card", { start: "top 92%", once: true, onEnter: b => gsap.from(b, { y: 70, opacity: 0, clipPath: "inset(100% 0% 0% 0%)", stagger: .08, duration: .9, ease: "power3.out", clearProps: "transform,clipPath" }) });
    // sticky stacking career cards: previous card shrinks as the next arrives
    const xs = $$(".xp");
    xs.forEach((c, i) => { if (i < xs.length - 1) gsap.to(c, { scale: .93, opacity: .55, ease: "none", scrollTrigger: { trigger: xs[i + 1], start: "top 75%", end: "top 25%", scrub: true } }); });

    // big footer letters rise
    gsap.from("#big i", { yPercent: 120, opacity: 0, stagger: .05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "#big", start: "top 95%" } });
    // services: stagger tilt-in
    gsap.from(".sc", { rotateX: 25, transformPerspective: 800, y: 60, stagger: .1, duration: .9, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: ".svc", start: "top 85%" } });
    // back-to-top ring
    const ring = $("#ring"), L = 2 * Math.PI * 20; ring.style.strokeDasharray = L;
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: s => { ring.style.strokeDashoffset = L * (1 - s.progress); $("#top").classList.toggle("on", scrollY > 600); } });
    $("#top").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
    // process line draws with scroll
    gsap.to("#pline", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 75%", end: "bottom 70%", scrub: true } });
  };

  /* ---------- mobile menu, toast, copy email ---------- */
  $("#burger").onclick = () => document.body.classList.toggle("menu");
  $("#menu").addEventListener("click", e => e.target.closest("a") && document.body.classList.remove("menu"));
  const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("on"), 2600); };
  document.addEventListener("click", e => { const b = e.target.closest(".copy"); if (b) navigator.clipboard.writeText(b.dataset.copy).then(() => toast("Email copied ✓"), () => toast("Select and copy the email manually")); });
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());

  /* ---------- preloader ---------- */
  const start = () => gsap.to("#loader i", { width: 160, duration: .9, ease: "power2.inOut", onComplete: () => gsap.to("#loader", { yPercent: -100, duration: .8, ease: "expo.inOut", onStart: intro, onComplete: () => { $("#loader").remove(); scrollFx(); ScrollTrigger.refresh(); } }) });
  document.readyState === "complete" ? start() : addEventListener("load", start);
})();
