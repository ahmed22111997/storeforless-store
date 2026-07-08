// Injects per-product Open Graph / Twitter Card meta tags at the edge,
// so links shared on WhatsApp, Facebook, etc. show the real product
// title, description and image instead of the generic site preview.
// The front-end JS still renders the visible page as before; this only
// rewrites the <head> meta tags in the HTML response for crawlers/bots
// (and for the real page load, before the JS replaces document.title).

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async (request, context) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const response = await context.next();

  if (!slug) return response;

  let products;
  try {
    const productsRes = await fetch(new URL('/data/products.json', url));
    if (!productsRes.ok) return response;
    products = await productsRes.json();
  } catch (e) {
    return response;
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) return response;

  let html = await response.text();

  const title = `${product.title} — StoreForLess`;
  const rawDesc = product.short_description || product.description || '';
  const desc = rawDesc.length > 200 ? rawDesc.slice(0, 197) + '...' : rawDesc;
  const image = product.image;
  const pageUrl = url.toString();

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/(<meta property="og:title" content=")(.*?)(")/, `$1${escapeHtml(title)}$3`);
  html = html.replace(/(<meta property="og:description" content=")(.*?)(")/, `$1${escapeHtml(desc)}$3`);
  html = html.replace(/(<meta property="og:image" content=")(.*?)(")/, `$1${image}$3`);
  html = html.replace(/(<meta property="og:url" content=")(.*?)(")/, `$1${pageUrl}$3`);
  html = html.replace(/(<meta name="twitter:title" content=")(.*?)(")/, `$1${escapeHtml(title)}$3`);
  html = html.replace(/(<meta name="twitter:description" content=")(.*?)(")/, `$1${escapeHtml(desc)}$3`);
  html = html.replace(/(<meta name="twitter:image" content=")(.*?)(")/, `$1${image}$3`);
  html = html.replace(/(<meta name="description" content=")(.*?)(")/, `$1${escapeHtml(desc)}$3`);

  return new Response(html, response);
};
