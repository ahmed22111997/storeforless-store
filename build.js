// build.js — runs on every Netlify deploy (see netlify.toml).
// Compiles the individual product/category files that the admin panel
// (Decap CMS) writes one-per-file into two flat JSON files the site's
// front-end JS can fetch quickly: /data/products.json and /data/categories.json
// No external dependencies — plain Node so no npm install step is required.

const fs = require('fs');
const path = require('path');

function readJSONDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      try {
        const obj = JSON.parse(raw);
        obj.slug = obj.slug || f.replace(/\.json$/, '');
        return obj;
      } catch (e) {
        console.error(`Skipping invalid JSON: ${f}`, e.message);
        return null;
      }
    })
    .filter(Boolean);
}

const productsDir = path.join(__dirname, 'content', 'products');
const categoriesDir = path.join(__dirname, 'content', 'categories');
const blogDir = path.join(__dirname, 'content', 'blog');
const outDir = path.join(__dirname, 'data');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const products = readJSONDir(productsDir).sort((a, b) => {
  return (b.featured === true) - (a.featured === true) ||
    new Date(b.date_added || 0) - new Date(a.date_added || 0);
});

const categories = readJSONDir(categoriesDir);

const blogPosts = readJSONDir(blogDir).sort((a, b) => {
  return (b.featured === true) - (a.featured === true) ||
    new Date(b.date_published || 0) - new Date(a.date_published || 0);
});

fs.writeFileSync(path.join(outDir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(outDir, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(outDir, 'blog.json'), JSON.stringify(blogPosts, null, 2));

console.log(`Built data/products.json (${products.length} products)`);
console.log(`Built data/categories.json (${categories.length} categories)`);
console.log(`Built data/blog.json (${blogPosts.length} blog posts)`);
