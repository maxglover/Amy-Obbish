# Amy Obbish — Artist Website

A dark editorial gallery website hosted on GitHub Pages.

---

## 📁 File Structure

```
amy-obbish-website/
├── index.html        ← Main page (edit text content here)
├── style.css         ← All styling
├── main.js           ← Interactions (filter, lightbox, cursor, etc.)
├── images/           ← Put your artwork images here
│   └── (your .jpg/.png/.webp files)
├── videos/           ← Put your video files here
│   └── (your .mp4 files)
└── README.md
```

---

## 🖼 Adding Your Artwork

### Images
1. Drop your image files into the `images/` folder (JPG, PNG, WebP all work).
2. Open `index.html` and find the `<!-- PLACEHOLDER CARDS -->` section.
3. Replace a placeholder card with a real one:

```html
<article class="card" data-category="painting">
  <div class="card__media">
    <img src="images/your-file.jpg" alt="Title of the Work" loading="lazy" />
  </div>
  <div class="card__info">
    <h3>Title of the Work</h3>
    <p>Oil on Canvas, 2024</p>
  </div>
</article>
```

**Card size modifiers** (add to the `class` attribute):
- Default → 1×1 grid cell
- `card--tall` → 1×2 (taller, good for portrait works)
- `card--wide` → 2×1 (wider, good for landscape works)

**Category options** (for the filter buttons):
- `painting`
- `mixed-media`
- `photography`
- `video`

### Videos
1. Drop `.mp4` files into the `videos/` folder.
2. Use this card template:

```html
<article class="card card--wide" data-category="video">
  <div class="card__media">
    <video src="videos/your-video.mp4" loop muted playsinline></video>
    <div class="card__play-icon">▶</div>
  </div>
  <div class="card__info">
    <h3>Title</h3>
    <p>Video, 2024</p>
  </div>
</article>
```

---

## ✏️ Editing Content

All text is in `index.html`. Search (Ctrl+F) for:

| What to change | Search for |
|---|---|
| Bio text | `Amy Obbish is a contemporary artist` |
| Email | `amy@example.com` |
| Social links | `contact__socials` |
| Location / Medium | `about__detail` |
| Portrait photo | `amy-portrait.jpg` |

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub repo
1. Go to [github.com](https://github.com) → click **New repository**
2. Name it: `amy-obbish` (or any name you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload files
**Option A — GitHub web interface (easiest):**
1. In your new repo, click **Add file → Upload files**
2. Drag all the files and folders into the upload area:
   - `index.html`
   - `style.css`
   - `main.js`
   - `images/` folder (with your artwork)
   - `videos/` folder (with your videos)
3. Click **Commit changes**

**Option B — Git command line:**
```bash
cd amy-obbish-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/amy-obbish.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your repo, go to **Settings** (top tab)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

### Step 4 — Your site is live! 🎉
After ~1 minute, your site will be at:
```
https://YOUR_USERNAME.github.io/amy-obbish/
```

---

## 💡 Tips

- **Image sizes:** Aim for 1200–2000px on the longest side, saved at 80% quality JPG. Keeps the site fast.
- **Video sizes:** Keep MP4 files under 20MB for fast loading. Use H.264 encoding.
- **Custom domain:** GitHub Pages supports custom domains (e.g. `amyobbish.com`) — set it in the Pages settings.
- **Updating:** Just upload new/changed files to GitHub and the site updates automatically.
