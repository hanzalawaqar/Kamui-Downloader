/* ============================================================
   KAMUI Downloader — website behaviour
   ============================================================
   ★ NOTE for the site owner:
   Edit the CONFIG block below to set download URLs, version,
   file sizes and release dates. Every button and badge on the
   page reads from here — set once, done.
   ============================================================ */

const CONFIG = {
  version: "v1.1.7",
  DOWNLOADS: {
    installer: "https://github.com/hanzalawaqar/Kamui-Downloader/releases/download/v1.1.7/Kamui.Downloader.Setup.v1.1.7.exe",
    portable:  "https://github.com/hanzalawaqar/Kamui-Downloader/releases/download/v1.1.7/Kamui.Portable.zip",
    extension: "https://github.com/hanzalawaqar/Kamui-Downloader/releases/download/v1.1.7/Kamui.Extension.zip",
  },
  // Shown on the download cards. Leave the placeholders until you know the real values.
  META: {
    "installer.size": "138 MB",  "installer.date": "v1.1.7",
    "portable.size":  "137 MB",  "portable.date":  "v1.1.7",
    "extension.size": "883 KB", "extension.date": "v1.1.7",
  },
};

(() => {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Download links, version, file meta ---------- */
  $$("a[data-dl]").forEach((a) => { a.href = CONFIG.DOWNLOADS[a.dataset.dl] || "#"; });
  $$("[data-version]").forEach((el) => { el.textContent = CONFIG.version; });
  $$("[data-meta]").forEach((el) => { if (CONFIG.META[el.dataset.meta]) el.textContent = CONFIG.META[el.dataset.meta]; });
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Toast (placeholder links) ---------- */
  let toastEl = null;
  function toast(msg) {
    if (toastEl) return;
    toastEl = document.createElement("div");
    toastEl.setAttribute("role", "status");
    toastEl.className = "glass";
    toastEl.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translate(-50%,10px);padding:12px 20px;border-radius:14px;font:500 13px Inter,system-ui,sans-serif;color:#f1f3fb;z-index:400;max-width:92%;text-align:center;opacity:0;transition:opacity .3s,transform .4s cubic-bezier(.2,.8,.2,1);background:rgba(10,13,28,.9)";
    toastEl.textContent = msg;
    document.body.appendChild(toastEl);
    requestAnimationFrame(() => { toastEl.style.opacity = "1"; toastEl.style.transform = "translate(-50%,0)"; });
    setTimeout(() => {
      toastEl.style.opacity = "0";
      setTimeout(() => { toastEl.remove(); toastEl = null; }, 350);
    }, 3400);
  }
  $$("a[data-dl]").forEach((a) => a.addEventListener("click", (e) => {
    const url = a.getAttribute("href");
    if (!url || url === "#") { e.preventDefault(); toast("Download link is not set yet — edit app.js → CONFIG → DOWNLOADS."); }
  }));
  $$("a[data-placeholder]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); toast("This page is coming soon."); }));

  /* ============================================================
     ACCENT COLOUR SYSTEM
     CSS does the real work through [data-accent] variables on <html>;
     JS only sets the attribute and remembers the choice.
     ============================================================ */
  const ACCENTS = ["blue", "purple", "cyan", "red", "green"];
  const dots = $$(".accent-dot");
  function setAccent(name, save = true) {
    if (!ACCENTS.includes(name)) name = "blue";
    root.setAttribute("data-accent", name);
    dots.forEach((d) => d.setAttribute("aria-pressed", String(d.dataset.accent === name)));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#070914");
    if (save) { try { localStorage.setItem("kamui-accent", name); } catch (e) { /* storage blocked: ignore */ } }
  }
  dots.forEach((d) => d.addEventListener("click", () => setAccent(d.dataset.accent)));
  setAccent(root.getAttribute("data-accent"), false);

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ============================================================
     SCROLL-DRIVEN EFFECTS (one rAF-throttled listener)
     progress bar · header state · orb parallax · scroll-spy
     ============================================================ */
  const header = $(".site-header");
  const progress = $(".scroll-progress span");
  const orbs = $$(".orb");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (!reduceMotion) orbs.forEach((o) => { o.style.transform = `translate3d(0, ${(-y * parseFloat(o.dataset.depth || 0)).toFixed(1)}px, 0)`; });
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Nav: sliding pill + scroll-spy ---------- */
  const nav = $(".main-nav");
  const navPill = $(".nav-pill");
  const navLinks = nav ? $$("a", nav) : [];
  function movePill(link) {
    if (!navPill) return;
    if (!link) { navPill.style.opacity = "0"; return; }
    navPill.style.opacity = "1";
    navPill.style.width = link.offsetWidth + "px";
    navPill.style.transform = `translateX(${link.offsetLeft}px)`;
  }
  let activeLink = null;
  if (nav) {
    navLinks.forEach((l) => {
      l.addEventListener("mouseenter", () => movePill(l));
      l.addEventListener("focus", () => movePill(l));
    });
    nav.addEventListener("mouseleave", () => movePill(activeLink));
    const sections = navLinks.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          activeLink = navLinks.find((l) => l.getAttribute("href") === "#" + en.target.id) || null;
          navLinks.forEach((l) => { l.classList.toggle("is-active", l === activeLink); if (l === activeLink) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
          movePill(activeLink);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
    window.addEventListener("resize", () => movePill(activeLink));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menu-toggle");
  const mobileNav = $("#mobile-nav");
  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open"); menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false"); menuBtn.setAttribute("aria-label", "Open menu");
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", mobileNav).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ============================================================
     SPOTLIGHT CARDS — pointer position → --mx / --my
     ============================================================ */
  if (finePointer) {
    $$(".spot").forEach((el) => el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true }));
  }

  /* ============================================================
     HERO: app mock panels + 3D tilt / mouse parallax
     ============================================================ */
  const mock = $("#appmock");
  const mockNavs = $$("#appmock .app-nav");
  const mockPanels = $$("#appmock .app-panel");
  let mockIndex = 0, mockTimer = null;
  function showPanel(i) {
    mockIndex = i;
    mockNavs.forEach((b, n) => b.classList.toggle("is-active", n === i));
    mockPanels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === mockNavs[i].dataset.panel));
  }
  function stopCycle() { clearInterval(mockTimer); mockTimer = null; }
  function startCycle() { if (!reduceMotion && !mockTimer) mockTimer = setInterval(() => showPanel((mockIndex + 1) % mockNavs.length), 4200); }
  mockNavs.forEach((b, i) => b.addEventListener("click", () => { stopCycle(); showPanel(i); }));
  if (mock) {
    startCycle();
    // Pause the cycle when the hero is off-screen (saves work) or the tab is hidden
    new IntersectionObserver(([en]) => { if (en.isIntersecting) { if (!mockTimer && mockNavs.length && !mock.dataset.manual) startCycle(); } else stopCycle(); }, { threshold: 0.2 }).observe(mock);
    mockNavs.forEach((b) => b.addEventListener("click", () => { mock.dataset.manual = "1"; }));
  }

  const tilt = $(".tilt");
  if (tilt && finePointer && !reduceMotion) {
    const chips = $$(".float-chip", tilt);
    const hero = $(".hero");
    let tx = 0, ty = 0, raf = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        tilt.style.setProperty("--ry", (tx * 9).toFixed(2) + "deg");
        tilt.style.setProperty("--rx", (-ty * 7).toFixed(2) + "deg");
        chips.forEach((c) => { const d = parseFloat(c.dataset.depth || 20); c.style.translate = `${(tx * d).toFixed(1)}px ${(ty * d).toFixed(1)}px`; });
        // background orbs react to the mouse a little too
        orbs.forEach((o, i) => { o.style.marginLeft = (tx * (24 + i * 14)).toFixed(1) + "px"; o.style.marginTop = (ty * (18 + i * 10)).toFixed(1) + "px"; });
      });
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      tilt.style.setProperty("--ry", "0deg"); tilt.style.setProperty("--rx", "0deg");
      chips.forEach((c) => { c.style.translate = "0 0"; });
    });
  }

  /* ============================================================
     CUSTOM CURSOR (fine pointers only) + magnetic buttons
     dot follows instantly, ring eases, 5 trail dots lag behind
     ============================================================ */
  if (finePointer && !reduceMotion) {
    const cur = $(".cursor");
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    const TRAIL = 5;
    const trail = Array.from({ length: TRAIL }, (_, i) => {
      const t = document.createElement("span");
      t.className = "cursor-trail";
      t.style.opacity = String(0.38 - i * 0.07);
      t.style.scale = String(1 - i * 0.14);
      cur.appendChild(t);
      return { el: t, x: -100, y: -100 };
    });
    let mx = -100, my = -100, rx = -100, ry = -100, started = false;
    root.classList.add("has-cursor");
    cur.classList.add("is-hidden");

    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      mx = e.clientX; my = e.clientY;
      if (!started) { started = true; rx = mx; ry = my; trail.forEach((t) => { t.x = mx; t.y = my; }); cur.classList.remove("is-hidden"); }
    }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.add("is-hidden"));
    document.addEventListener("pointerenter", () => { if (started) cur.classList.remove("is-hidden"); });
    window.addEventListener("pointerdown", () => cur.classList.add("is-down"));
    window.addEventListener("pointerup", () => cur.classList.remove("is-down"));

    const HOVER_SEL = "a, button, [role='button'], .slide, .spot, .faq-q, .chip, .accent-dot";
    document.addEventListener("pointerover", (e) => { if (e.target.closest && e.target.closest(HOVER_SEL)) cur.classList.add("is-hover"); });
    document.addEventListener("pointerout",  (e) => { if (e.target.closest && e.target.closest(HOVER_SEL) && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER_SEL))) cur.classList.remove("is-hover"); });

    (function loop() {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      let px = rx, py = ry;
      trail.forEach((t, i) => {
        t.x += (px - t.x) * (0.34 - i * 0.04); t.y += (py - t.y) * (0.34 - i * 0.04);
        t.el.style.transform = `translate3d(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px, 0)`;
        px = t.x; py = t.y;
      });
      requestAnimationFrame(loop);
    })();

    // Magnetic buttons: pull toward the pointer within a small radius
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ============================================================
     SCREENSHOT CAROUSEL (coverflow) + LIGHTBOX WITH ZOOM
     ============================================================ */
  const carousel = $("#carousel");
  const slides = $$(".slide", carousel || document);
  const dotsWrap = $("#car-dots");
  const live = $("#car-live");
  let cur = 0;

  function renderCarousel(announce) {
    slides.forEach((s, i) => {
      let o = i - cur; const n = slides.length; // wrap to the shortest distance so both sides always have neighbours
      if (o > n / 2) o -= n; else if (o < -n / 2) o += n;
      s.style.setProperty("--o", Math.max(-2, Math.min(2, o)));
      s.style.setProperty("--ao", Math.min(Math.abs(o), 2));
      s.classList.toggle("is-current", i === cur);
      s.style.visibility = Math.abs(o) > 2 ? "hidden" : "visible";
      s.setAttribute("aria-hidden", String(i !== cur));
      s.tabIndex = i === cur ? 0 : -1;
    });
    $$("button", dotsWrap).forEach((b, i) => { if (i === cur) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    if (announce && live) live.textContent = `Screenshot ${cur + 1} of ${slides.length}: ${slides[cur].dataset.title}`;
  }
  function goTo(i) { cur = (i + slides.length) % slides.length; renderCarousel(true); }

  if (carousel && slides.length) {
    slides.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", `Show ${s.dataset.title} screenshot`);
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
      s.addEventListener("click", () => { if (i === cur) openLightbox(i); else goTo(i); });
      s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } });
    });
    $("#car-prev").addEventListener("click", () => goTo(cur - 1));
    $("#car-next").addEventListener("click", () => goTo(cur + 1));
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(cur - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(cur + 1); }
    });
    // swipe
    let sx = null;
    carousel.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    carousel.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) { goTo(cur + (dx < 0 ? 1 : -1)); carousel.dataset.swiped = "1"; setTimeout(() => delete carousel.dataset.swiped, 50); }
    });
    // a swipe shouldn't also count as a click that opens the lightbox
    carousel.addEventListener("click", (e) => { if (carousel.dataset.swiped) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    renderCarousel(false);
  }

  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbStage = $("#lb-stage"), lbTitle = $("#lb-title");
  let lbIndex = 0, zoom = 1, lastFocus = null;
  function setZoom(z, ox, oy) {
    zoom = Math.max(1, Math.min(3.5, z));
    if (ox !== undefined) { lbImg.style.setProperty("--ox", ox + "%"); lbImg.style.setProperty("--oy", oy + "%"); }
    lbImg.style.setProperty("--zoom", zoom);
    lbStage.classList.toggle("is-zoomed", zoom > 1);
    if (zoom === 1) { lbImg.style.setProperty("--ox", "50%"); lbImg.style.setProperty("--oy", "50%"); }
  }
  function showLb(i) {
    lbIndex = (i + slides.length) % slides.length;
    const img = $("img", slides[lbIndex]);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = `${slides[lbIndex].dataset.title} — ${lbIndex + 1} / ${slides.length}`;
    setZoom(1);
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showLb(i);
    lb.hidden = false; document.body.classList.add("lb-open");
    $("#lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.classList.remove("lb-open");
    goTo(lbIndex);
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    $$("[data-close]", lb).forEach((el) => el.addEventListener("click", closeLightbox));
    $("#lb-prev").addEventListener("click", () => showLb(lbIndex - 1));
    $("#lb-next").addEventListener("click", () => showLb(lbIndex + 1));
    $("#lb-zoom-in").addEventListener("click", () => setZoom(zoom + 0.75));
    $("#lb-zoom-out").addEventListener("click", () => setZoom(zoom - 0.75));
    // click toggles zoom at the clicked point; moving the mouse while zoomed pans
    lbImg.addEventListener("click", (e) => {
      const r = lbImg.getBoundingClientRect();
      const ox = ((e.clientX - r.left) / r.width) * 100, oy = ((e.clientY - r.top) / r.height) * 100;
      if (zoom > 1) setZoom(1); else setZoom(2.2, ox, oy);
    });
    lbStage.addEventListener("pointermove", (e) => {
      if (zoom <= 1 || e.pointerType === "touch") return;
      const r = lbStage.getBoundingClientRect();
      lbImg.style.setProperty("--ox", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
      lbImg.style.setProperty("--oy", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
    });
    lbStage.addEventListener("wheel", (e) => { e.preventDefault(); setZoom(zoom + (e.deltaY < 0 ? 0.4 : -0.4)); }, { passive: false });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      else if (e.key === "ArrowRight") showLb(lbIndex + 1);
      else if (e.key === "+" || e.key === "=") setZoom(zoom + 0.75);
      else if (e.key === "-") setZoom(zoom - 0.75);
      else if (e.key === "Tab") { // keep focus inside the dialog
        const f = $$("button", lb).filter((b) => b.offsetParent !== null);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ============================================================
     FAQ ACCORDION (animated via grid-template-rows in CSS)
     ============================================================ */
  const faqItems = $$(".faq-item");
  faqItems.forEach((item) => {
    const q = $(".faq-q", item);
    q.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      faqItems.forEach((o) => { o.classList.remove("is-open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      if (willOpen) { item.classList.add("is-open"); q.setAttribute("aria-expanded", "true"); }
    });
  });
})();
