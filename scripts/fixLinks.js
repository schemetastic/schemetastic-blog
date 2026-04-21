import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const mapping = {
  'shorter-conditionals-with-truthy-and-falsy-values-in-js-1f2e': 'shorter-conditionals-truthy-falsy-values',
  'tips-for-better-and-readable-conditionals-in-js-6a': 'better-and-readable-conditionals',
  'introducing-typelib-js-simplified-type-detection-and-debugging': 'introducing--typelib-js',
  '3-benefits-of-doing-technical-writing-7-tips-to-get-you-started-248d': '3-benefits-of-doing-technical-writing-plus-7-tips',
  'squeeze-out-the-potential-of-template-literals-in-js-bnc': 'squezee-out-template-literals-potential',
  'the-conditional-ternary-operator-in-js-is-simpler-than-it-seems-3lk6': 'the-conditional-ternary-operator',
  'when-to-use-function-declarations-or-function-expressions-in-javascript-1bg3': 'function-declarations-vs-function-expressions',
  'series-things-i-wish-i-knew-before-in-javascript-intro-2bb6': 'shorter-conditionals-truthy-falsy-values' // Best match for intro
};

for (const file of files) {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Replace Dev.to links
  for (const [devSlug, localSlug] of Object.entries(mapping)) {
    const devUrl = `https://dev.to/schemetastic/${devSlug}`;
    if (content.includes(devUrl)) {
      content = content.replace(new RegExp(devUrl, 'g'), `post/${localSlug}`);
      changed = true;
    }
  }

  // 2. Replace any relative links starting with ../
  const relativeLinkRegex = /\]\(\.\.\/([^\)]+)\)/g;
  if (relativeLinkRegex.test(content)) {
    content = content.replace(relativeLinkRegex, (match, slug) => {
      // Normalize slug: remove .md, remove training slash
      const cleanSlug = slug.replace('.md', '').replace(/\/$/, '');
      return `](post/${cleanSlug})`;
    });
    changed = true;
  }

  // 3. Fix post/ links that might be wrong (like the one in grouped types)
  const postLinkRegex = /\]\(post\/([^\)]+)\)/g;
  content = content.replace(postLinkRegex, (match, slug) => {
    const cleanSlug = slug.replace(/\/$/, '');
    // If it's in our mapping (as a key), replace it
    for (const [devSlug, localSlug] of Object.entries(mapping)) {
      if (cleanSlug === devSlug) {
        changed = true;
        return `](post/${localSlug})`;
      }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated links in ${file}`);
  }
}
