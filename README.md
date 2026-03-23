# 🎂 Birthday Website Template

A beautiful, interactive birthday website template built with **React + TypeScript + Vite + Tailwind CSS**. Features animations, a photo book, captcha challenge, candle-blowing with confetti, and more.

## ✨ Features

- 🧩 Interactive captcha challenge with custom stickers
- 📖 Animated photo book with flip navigation
- 🎂 Candle blowing with countdown, confetti, and cherry blossom fall
- 💬 Compliment generator with reaction images
- 🌸 Floating flower parallax background
- ✨ Sparkle cursor trail
- 🎵 Background music with automatic transitions

## 🚀 Quick Start

### 1. Get the template
To use this template, either **Fork** it on GitHub or clone it locally:

```bash
git clone https://github.com/spersh-verma/birthday-website.git
cd birthday-website
```

### 2. Install dependencies

```bash
npm install
npm run dev
```

### 2. Customize the website

Open **`src/config.ts`** — this is the **only file you need to edit** to personalize the website.

You can customize:

| Section | What to change |
|---------|---------------|
| **General** | `siteName`, `siteTitle`, `navLogo` |
| **Music** | Background and candle music paths + volumes |
| **Intro** | Date, title, photo, pill badge text |
| **Captcha** | Title, images, correct answers, error messages, hints.<br/>**Note:** By default, the correct answers are pictures **2, 4, 6, and 8**. Also, hint stickers will automatically appear after 3 failed attempts to help the user pass. |
| **Who Section** | Photo, bio, caption |
| **Compliments** | Compliment messages, reaction images |
| **Photo Book** | Pages with images + captions |
| **Finale** | Heading, subtitle, cake image, dancing GIFs |
| **Tribute** | Title, heartfelt message, group photo |
| **Closing** | Final birthday heading + subtitle |

### 3. Replace images

Put your images in the `public/` folder and update the paths in `src/config.ts`.

### 4. Run locally

```bash
npm run dev
```

### 5. Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## 📁 Project Structure

```
/
├── public/           # Images, music, GIFs
├── src/
│   ├── config.ts     # ⭐ EDIT THIS to customize
│   ├── App.tsx       # Root component
│   ├── sections/     # Page sections
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom hooks
│   └── lib/          # Animation utilities
├── index.html        # Entry point
└── package.json
```

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 5
- Tailwind CSS 3.4
- GSAP (animations)
- canvas-confetti
- Lucide React (icons)
