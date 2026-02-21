# Sourav Ghosh — Portfolio Website

> **Senior Technical Lead | Automotive Embedded Engineer**  
> Live at: `https://<your-github-username>.github.io/sourav-portfolio/`

---

## 📁 Folder Structure

```
sourav-portfolio/
├── index.html              ← Main portfolio page
├── README.md               ← This file
└── assets/
    ├── css/
    │   └── style.css       ← All styles (dark automotive theme)
    ├── js/
    │   └── main.js         ← Animations, canvas, interactions
    └── images/
        └── mypic.jpg       ← ⚠️ Replace with your actual photo!
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **+ New repository**
3. Name it: `sourav-portfolio` (or `<your-username>.github.io` for root deployment)
4. Set to **Public**
5. Click **Create repository**

### Step 2 — Upload Files
**Option A: GitHub Web Interface (easy)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop the entire `sourav-portfolio` folder contents
3. Click **Commit changes**

**Option B: Git CLI (recommended)**
```bash
cd sourav-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/sourav-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select: `Deploy from a branch`
5. Branch: `main` / Folder: `/ (root)`
6. Click **Save**

### Step 4 — Access Your Site
After 1–2 minutes, your site will be live at:
```
https://<your-github-username>.github.io/sourav-portfolio/
```

---

## 📸 Adding Your Photo

1. Place your photo file in `assets/images/`
2. Name it exactly: `mypic.jpg`
3. Recommended size: **400×400px** minimum, square crop works best
4. Commit and push the image

---

## ✏️ Customizing Content

All content is in `index.html`. Search for these sections to edit:
- **Profile Summary** → `#hero` section
- **Work Experience** → `#experience` section  
- **Skills** → `#skills` section
- **Contact Info** → `#contact` section

---

## 🎨 Features

- ✅ Animated circuit board background (canvas)
- ✅ Typed text animation in hero
- ✅ Animated skill progress bars
- ✅ Scroll-triggered reveal animations
- ✅ Timeline for work experience with stagger effect
- ✅ Counter animations for stats
- ✅ Floating image frame with glow border
- ✅ Fixed navbar with scroll detection
- ✅ Responsive design (mobile friendly)
- ✅ Contact form with feedback
- ✅ Custom scrollbar
- ✅ Dark automotive tech theme

---

## 📬 Contact

**Sourav Ghosh**  
📧 sourav.ghosh196@gmail.com  
🔗 [linkedin.com/in/sourav-ghosh004](https://www.linkedin.com/in/sourav-ghosh004/)
