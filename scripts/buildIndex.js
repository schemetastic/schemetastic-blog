import fs from 'fs';
import path from 'path';
import toml from 'toml';

const postsDir = path.join(process.cwd(), 'posts');
const dataDir = path.join(process.cwd(), 'src', 'data');
const staticImagesDir = path.join(process.cwd(), 'static', 'images');
const publicImagesDir = path.join(process.cwd(), 'public', 'images');

// Ensure directories exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(path.dirname(publicImagesDir))) {
  fs.mkdirSync(path.dirname(publicImagesDir), { recursive: true });
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(staticImagesDir)) {
  copyDirSync(staticImagesDir, publicImagesDir);
  console.log(`Copied images to public/images.`);
}

// 2. Parse Markdown Files
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
const posts = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  
  // Extract TOML frontmatter (between +++ and +++)
  const match = content.match(/^\+\+\+([\s\S]*?)\+\+\+/);
  
  if (match) {
    try {
      const frontmatter = toml.parse(match[1]);
      const markdown = content.slice(match[0].length).trim();
      
      const slug = file.replace('.md', '').trim().replace(/\s+/g, '-');
      
      posts.push({
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        tags: frontmatter.tags || [],
        author: frontmatter.author,
        content: markdown // Storing content in the JSON for easier fetching
      });
    } catch (e) {
      console.error(`Error parsing TOML in ${file}:`, e);
    }
  } else {
    console.warn(`No TOML frontmatter found in ${file}`);
  }
}

// Sort by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(path.join(dataDir, 'posts.json'), JSON.stringify(posts, null, 2));
console.log(`Successfully indexed ${posts.length} posts.`);

// 3. Generate Sitemap
const baseUrl = 'https://schemetastic.com';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/post/${encodeURIComponent(post.slug)}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Generated sitemap.xml in public directory.');
