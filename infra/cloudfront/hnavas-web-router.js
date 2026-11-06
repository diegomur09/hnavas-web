// CloudFront Function (viewer-request), runtime cloudfront-js-2.0.
// Deployed by hand as `hnavas-web-router` (prod, E36CZFFKNCZS9Z) and
// `hnavas-web-router-qa` (QA, E1SFUTTAM67WPA). Keep both on this same code.
// Deploy steps are in infra/cloudfront/README.md.

var APEX = 'hnavasystems.com';

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var query = queryString(request.querystring);

  // English is served prefix-less (/denver/), Spanish keeps its prefix
  // (/es/denver/). The S3 export still stores every page under /en or /es, so
  // this function maps the public URL onto the object and permanently redirects
  // the legacy /en/* URLs that Google already indexed.

  // --- Permanent redirects: one canonical URL per page. ---
  // Every redirect keeps the query string, so UTM tags (Google Business
  // profile, posts) survive the hop and still reach Analytics.

  // www serves the same site; send it to the apex so Google and AI crawlers
  // see one host. Same path, same query.
  var host = request.headers.host ? request.headers.host.value : '';
  if (host === 'www.' + APEX) {
    return redirect('https://' + APEX + uri, query);
  }

  // The dev-only root fallback must never compete with the real home.
  if (uri === '/index.html') {
    return redirect('/', query);
  }

  // Legacy English URLs → the same page without the prefix.
  if (uri === '/en' || uri === '/en/') {
    return redirect('/', query);
  }
  if (uri.startsWith('/en/') && uri.endsWith('/')) {
    return redirect(uri.substring(3), query);
  }

  // Bare Spanish locale → add the trailing slash the export is built with.
  if (uri === '/es') {
    return redirect('/es/', query);
  }

  // Extensionless page request missing its trailing slash → add it. Metadata
  // image objects (/en/opengraph-image, /es/twitter-image) are also
  // extensionless, so they're excluded and pass straight through below.
  if (
    !uri.endsWith('/') &&
    !uri.startsWith('/en/') &&
    !uri.startsWith('/es/') &&
    uri.lastIndexOf('.') <= uri.lastIndexOf('/')
  ) {
    return redirect(uri + '/', query);
  }

  // --- Rewrites: public URL → the object that holds the page. ---

  if (uri === '/') {
    request.uri = '/en/index.html';
  } else if (uri.endsWith('/')) {
    request.uri = uri.startsWith('/es/')
      ? uri + 'index.html'
      : '/en' + uri + 'index.html';
  }

  // Everything else passes through unchanged: hashed assets (they have
  // extensions), robots.txt, sitemap.xml and the metadata image objects.
  return request;
}

function redirect(location, query) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: query ? location + '?' + query : location } },
  };
}

// Rebuilds the query string from CloudFront's object form. Values arrive as
// they were in the URL (still encoded), so they are joined back unchanged.
function queryString(qs) {
  var parts = [];
  for (var key in qs) {
    var entry = qs[key];
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(pair(key, entry.multiValue[i].value));
      }
    } else {
      parts.push(pair(key, entry.value));
    }
  }
  return parts.join('&');
}

function pair(key, value) {
  return value === '' ? key : key + '=' + value;
}
