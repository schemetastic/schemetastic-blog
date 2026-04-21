# Schemetastic Blog

A professional, high-performance blog platform built with a focus on modern aesthetics, responsiveness, and developer experience. Designed and developed using **Paper** with **Antigravity** (AI assisted).

## ✨ Features

- **🚀 React + Vite Stack**: Lightning-fast development and build times.
- **📝 Markdown Focused**: Write posts in standard Markdown with TOML frontmatter.
- **🔍 Intelligent Search**: Real-time, keyboard-navigable search modal with text highlighting.
- **🎨 Premium Aesthetics**: "Nocturnal Purple" design system with glassmorphism, smooth gradients, and deep dark modes.
- **✨ Animated Hero**: Integrated `@paper-design/shaders-react` Warp shader for a dynamic background.
- **📱 Ultra-Responsive**: Fluid layout supporting devices from 320px up to 4K displays.
- **🗺️ Automated SEO**: Automatic sitemap generation and internal link normalization during the build process.
- **📄 Pagination**: Query-parameter based pagination for high-performance post browsing.

## 🛠️ Technology Stack

- **Core**: React 18, Vite
- **Routing**: React Router 6
- **Markdown**: React Markdown, Remark GFM, TOML
- **Visuals**: Vanilla CSS (Custom Design System), Paper Shaders
- **Build Pipeline**: Custom Node.js scripts for post indexing and asset management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with hot-reload:
```bash
npm run dev
```

### Production Build

Generate a production-ready bundle with optimized assets and updated search index:
```bash
npm run build
```

## 📂 Project Structure

- `posts/`: Your blog content in `.md` files.
- `static/images/`: Source assets for your posts.
- `scripts/`: Custom build scripts for indexing and link fixing.
- `src/components/`: Reusable React UI components.
- `src/pages/`: Main application views.
- `src/data/`: Auto-generated search index and post metadata.

---

Built with 💜 by **Antigravity** on the **Paper** canvas.
