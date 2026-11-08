# CloudFront router

`hnavas-web-router.js` is the viewer-request CloudFront Function in front of the
static export. It was created by hand in the console and lived only in AWS until
6 Nov 2026; this file is now the source of truth.

What it does:
- `www.hnavasystems.com/*` → 301 to `https://hnavasystems.com/*` (one host).
- Legacy `/en/*` URLs → 301 to the same page without the prefix.
- Adds the trailing slash to extensionless page URLs.
- Rewrites public URLs onto the S3 objects (`/denver/` → `/en/denver/index.html`).
- Every redirect keeps the query string, so UTM tags reach Analytics.

Two copies run the same code:

| Function | Distribution | Site |
|---|---|---|
| `hnavas-web-router-qa` | `E1SFUTTAM67WPA` | https://dpfbof69kqlws.cloudfront.net |
| `hnavas-web-router` | `E36CZFFKNCZS9Z` | https://hnavasystems.com |

## Deploy (QA first, then prod)

The default AWS profile is the live account (880274732746).

```bash
NAME=hnavas-web-router-qa   # then hnavas-web-router
ETAG=$(aws cloudfront describe-function --name $NAME --query ETag --output text)
aws cloudfront update-function --name $NAME --if-match $ETAG \
  --function-config "{\"Comment\":\"<keep it under 128 chars>\",\"Runtime\":\"cloudfront-js-2.0\"}" \
  --function-code fileb://hnavas-web-router.js
# Test the DEVELOPMENT stage before publishing:
ETAG=$(aws cloudfront describe-function --name $NAME --query ETag --output text)
aws cloudfront test-function --name $NAME --if-match $ETAG --stage DEVELOPMENT \
  --event-object fileb://event.json
aws cloudfront publish-function --name $NAME --if-match $ETAG
```

Order with the site build: when a change to the routing rules is needed by a new
build, publish the function first. A new build behind the old router can 404.
