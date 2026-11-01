KAMUI WEBSITE — QUICK GUIDE (read this!)
=========================================

Files inside this folder:
  index.html      -> main website page
  styles.css      -> design/colors/fonts
  app.js          -> behaviour + DOWNLOAD LINKS (see below)
  assets/
    kamui-logo.png-> your app logo (used in header, hero, footer)
    favicon.svg   -> browser tab icon (K logo)
    og-image.png  -> social share preview (1200x630)
    screenshots/  -> PLACEHOLDER screenshots (see section 7)

═══════════════════════════════════════════
1) ADD YOUR DOWNLOAD LINKS (most important)
═══════════════════════════════════════════
Open app.js in Notepad and change ONLY this part:

  const CONFIG = {
    version: "v1.1.7",
    DOWNLOADS: {
      installer: "#",   <- put your KAMUI-Setup-v1.1.7.exe URL here
      portable:  "#",   <- put your KAMUI-Portable zip URL here
      extension: "#",   <- put your extension zip URL here
    },
  };

Tip: You can also just copy these files INTO your download folder and use
relative names like installer: "KAMUI-Setup-v1.1.7.exe".

Save the file and refresh the website — all 4+ download buttons update
automatically. While a link is still "#", the site shows a small reminder
toast instead of jumping (this disappears once real URLs are set).

═══════════════════════════════════════════
2) CHANGE VERSION NUMBER (after v1.1.7)
═══════════════════════════════════════════
Same place: CONFIG.version in app.js. Every badge updates automatically.
The same CONFIG also holds the file size and release date shown on each
download card (CONFIG.META). The "Beta" badge text is in index.html.

═══════════════════════════════════════════
3) HOW TO TEST ON YOUR PC
═══════════════════════════════════════════
Double-click index.html — it opens in your browser. That's it.
(Agar tezayi sa browser ki window mein preview chahiye to browser mein
 drag kar ke index.html drop karein.)

═══════════════════════════════════════════
4) HOW TO PUBLISH ONLINE (free options)
═══════════════════════════════════════════
Option A — Netlify Drop (easiest, 1 minute):
  1. Go to https://app.netlify.com/drop
  2. Drag the WHOLE kamui-website folder onto the page
  3. You get a live link like kamui-downloader.netlify.app

Option B — GitHub Pages:
  1. Create a free account, make a repo "kamui-website"
  2. Upload all files, then Settings -> Pages -> deploy from main branch.

Option C — apni hosting / cPanel:
  Upload ALL files from this folder into public_html (ya site ka root folder).

═══════════════════════════════════════════
5) SEO (Google search)
═══════════════════════════════════════════
When you have your final domain (e.g. https://kamuidownloader.com):
  - Replace "example.com" in robots.txt and sitemap.xml with your domain.
  - Submit the sitemap in Google Search Console.

═══════════════════════════════════════════
6b) ACCENT COLOURS
═══════════════════════════════════════════
The five dots in the header switch the whole site colour and the choice is
remembered (localStorage key "kamui-accent"). Colours are CSS variables at
the top of styles.css: the :root block and the [data-accent="..."] blocks.
To add a colour: add a new [data-accent="name"] block, a button in the header
(index.html) and the name to ACCENTS in app.js.

═══════════════════════════════════════════
7) REAL SCREENSHOTS
═══════════════════════════════════════════
Put your PNG/JPG files in assets/screenshots/ (16:10 ratio looks best) and
change each <img src="..."> inside the #screenshots section of index.html.
Captions are the <figcaption> text; the lightbox title is data-title.
Add or remove <figure class="slide"> blocks freely — dots update automatically.

═══════════════════════════════════════════
8) PLACEHOLDERS STILL TO FILL
═══════════════════════════════════════════
  - Documentation, GitHub, Privacy Policy, Terms (footer; show a "soon" tag
    and a toast until you give them real hrefs — remove data-placeholder).
  - example.com in index.html (canonical, og:url, og:image, JSON-LD).
  - Changelog / "Future updates" box in the Download section.

═══════════════════════════════════════════
9) EDITING TEXT / COLORS
═══════════════════════════════════════════
  All text      -> index.html (plain searchable words)
  Colors/fonts  -> styles.css top ":root" variables
                    --a / --a-hi / --a-2 = accent (set per [data-accent])
                    --bg page background
