# TODO

## Serve images from CloudFront (deferred — backend not configured yet)

**Status:** code is already CDN-ready. Every image flows through `assetUrl()` in
`src/lib/site.ts`, which prefixes paths with `NEXT_PUBLIC_ASSET_BASE_URL`.
Today that var is empty, so images are served locally from `/public` (and in
prod, through the site's own CloudFront, since the static export sits behind it).
To move images onto a dedicated CDN, do the following:

### 1. Provision infrastructure (one time)
- Create an S3 bucket for assets, e.g. `hnavasystems-assets` (block public access ON).
- Create a CloudFront distribution with that bucket as origin via **OAC**
  (Origin Access Control), default root behavior, `Cache-Control: public, max-age=31536000, immutable`.
- (Optional) Map a domain like `cdn.hnavasystems.com` with an ACM cert in `us-east-1`.
- Prefer doing this in CDK to match the rest of the stack.

### 2. Upload the assets
```bash
cd frontend
aws s3 sync public/logos s3://hnavasystems-assets/logos \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type-by-extension
# SVGs need the right content type if --content-type-by-extension isn't honored:
aws s3 cp public/logos/tech s3://hnavasystems-assets/logos/tech \
  --recursive --exclude "*" --include "*.svg" \
  --content-type "image/svg+xml" \
  --cache-control "public, max-age=31536000, immutable"
```

### 3. Point the app at the CDN
- Set the env var at build time:
  `NEXT_PUBLIC_ASSET_BASE_URL=https://cdn.hnavasystems.com`
- Rebuild + redeploy.

### 4. Invalidate on future asset changes
```bash
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/logos/*"
```

### Notes
- **Format policy (SEO/GEO/perf):** raster images (photos/screenshots) are WebP;
  logos/icons stay SVG (vector, ~1 KB, crisp on retina). Do not convert SVG→WebP.
- Filenames are stable, so the immutable cache is safe; bump a filename (or
  invalidate) when an image's content changes.
