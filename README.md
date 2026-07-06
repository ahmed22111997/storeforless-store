# StoreForLess — Global Affiliate Deals Site

A ready-to-deploy discount/affiliate marketplace (same concept as HalfPe, aimed at a
global audience) with a real admin panel to add/edit products — no coding required
after setup.

## What's inside
- `index.html`, `category.html`, `product.html` — the public site
- `admin/` — Decap CMS admin panel (login-protected via Netlify Identity)
- `content/products/*.json` — one file per product (edited via the admin panel)
- `content/categories/*.json` — categories shown in the nav/filter strip
- `content/pages/*.json` — About / Contact / Privacy / Terms / Affiliate Disclosure text
- `build.js` — compiles the individual product/category files into `data/products.json`
  and `data/categories.json` on every deploy (Netlify runs this automatically)
- `netlify.toml` — deploy configuration

## 1. Deploy to Netlify
1. Push this folder to a new GitHub repository.
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build command and publish directory are already set in `netlify.toml` — just click **Deploy**.
4. Once live, go to **Site configuration → Identity → Enable Identity**.
5. Under Identity → **Registration**, set to "Invite only".
6. Under Identity → **Services**, enable **Git Gateway**.
7. Go to Identity → **Invite users** → invite your own email. You'll get a link to set a password.
8. Visit `yoursite.netlify.app/admin/` and log in — this is your product management dashboard.

## 2. Add/edit products
Open `/admin/` on your live site. You can:
- Add a product: title, category, image, original/deal price, discount %, and your **affiliate link**
- Mark items "Featured" to show them at the top of the homepage
- Edit the About/Contact/Privacy/Terms/Disclosure text under "Site Pages"

Every save creates a commit → Netlify rebuilds → the site updates in ~1 minute.

## 3. Connect Amazon Associates (affiliate income)
1. Apply at **affiliate-program.amazon.com** (use your country's Amazon site, or the US one for a global audience).
2. You need a live site with real content *before* applying — this scaffold already has that.
3. Amazon typically requires **3 qualifying sales within 180 days** of approval to keep the account active — plan initial traffic/promotion accordingly.
4. Once approved, get your **tracking ID** (e.g. `yoursite-20`) and append it to every product link:
   `https://www.amazon.com/dp/ASIN?tag=yoursite-20`
5. Amazon's rules require a clear disclosure near affiliate links — this is already included in `affiliate-disclosure.html` and on every product page.
6. Amazon does **not** allow: cloaked/shortened links that hide the destination, emailing affiliate links directly, or posting them in ebooks/PDFs without disclosure.
7. For a global audience, consider **Awin, CJ Affiliate, or Impact** too — many international retailers (fashion, electronics, travel) run their programs there instead of Amazon.

## 4. Requirements to get accepted into Google AdSense
Google reviews the whole site, not just one page. Before applying:

1. **Original, sufficient content** — product write-ups should be your own descriptions (already the case here), not copy-pasted from Amazon. Aim for at least 20–30 published, unique products/pages before applying, not just the 6 samples included.
2. **Required pages present** — ✅ already included: Privacy Policy, Terms of Service, About, Contact, Affiliate Disclosure.
3. **Privacy Policy must mention Google/advertising cookies** — ✅ already worded to cover this.
4. **Easy navigation** — working menu, no dead links, mobile-friendly — ✅ built responsive.
5. **A custom domain** — a `.netlify.app` subdomain can technically be reviewed, but a custom domain (e.g. `yourbrand.com`, ~$10–15/yr) is strongly recommended and looks far more trustworthy to reviewers.
6. **Real traffic and age** — sites with zero visits or that are brand-new sometimes get rejected for "low value content" even if technically complete; a few weeks of genuine visitors before applying helps.
7. **No policy violations** — no pirated content, no excessive/misleading ads already on the page, no adult or violent content.
8. Apply at **google.com/adsense** with the live domain, paste the provided site verification snippet into `<head>` of every page (I can add this for you once you have the code), and wait — review can take from a few days to several weeks.
9. AdSense and Amazon Associates can run **on the same site simultaneously** — that's exactly what this scaffold is built for.

## 5. Before going live — replace the placeholders
- [ ] Swap every `REPLACE-ASIN` / `YOUR-AFFILIATE-ID-20` in `content/products/*.json` with real Amazon links once approved
- [ ] Replace `placehold.co` sample images with real product photos (Amazon product images require their API/OneLink for reuse — see Amazon's image-use policy — or use your own photos)
- [ ] Update the email in `content/pages/contact.json`
- [ ] Update the domain in `robots.txt`
- [ ] Add a real logo/favicon
- [ ] Rename the brand from "StoreForLess" if you want something else — it's a placeholder name, easy to find-and-replace across all files

## Local preview
Any static file server works, e.g.:
```
npx serve .
```
Then open the printed localhost URL.
