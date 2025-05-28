// simple-server.js (ULTIMATE VERSION 2 - Dynamic JSON & JS fix)
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url'); // Added for URL parsing

const port = 3006;
const BASE_PATH = '/Peter-Portfolio'; // Matches your next.config.js production basePath

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse URL to easily get pathname and query
  let requestPath = parsedUrl.pathname;
  const query = parsedUrl.query;

  // 1. Handle Base Path: Remove it if present
  if (requestPath.startsWith(BASE_PATH)) {
    requestPath = requestPath.substring(BASE_PATH.length);
  }

  // 2. Determine file path and content type
  let filePath;
  let contentType;

  if (requestPath.startsWith('/_next/static/')) {
    // This is a request for a static asset (CSS, JS, images, fonts, etc.)
    // These are located directly in the .next/static folder
    filePath = path.join(__dirname, '.next', requestPath.substring('/_next/'.length));
    contentType = getContentType(requestPath); // Determine content type based on extension

    // Special handling for [slug].js in static chunks
    // The request comes in as /_next/static/chunks/pages/blog/%5Bslug%5D-c56f958729d346c3.js
    // but the file on disk is likely `[slug]-c56f958729d346c3.js` (unescaped)
    if (filePath.includes('%5Bslug%5D')) {
        filePath = filePath.replace(/%5Bslug%5D/g, '[slug]');
    }

  } else if (requestPath.startsWith('/_next/data/')) {
    // This is a request for Next.js data (JSON files for static props/server props)
    // We need to strip the /_next/data/<build_id>/ part and get the file name.

    const parts = requestPath.split('/');
    // parts[0] = ''
    // parts[1] = '_next'
    // parts[2] = 'data'
    // parts[3] = '<build_id>'
    // parts[4] = 'index.json' OR 'blog'
    // parts[5] = 'the-rise-of-ai-in-software-development-friend-or-foe.json' (if dynamic blog)

    let jsonFileName = parts[4]; // e.g., 'index.json' or 'blog' for dynamic routes
    
    // For dynamic pages (e.g., blog posts), the JSON might be in a a subfolder and have a slug name
    // The request path could be like /_next/data/<build_id>/blog/slug.json
    if (parts.length > 4 && parts[4] === 'blog' && parts[5]) { // Check for /_next/data/<build_id>/blog/SLUG.json
        jsonFileName = parts.slice(4).join(path.sep); // This forms 'blog/the-rise-of-ai-in-software-development-friend-or-foe.json'
        filePath = path.join(__dirname, '.next', 'server', 'pages', jsonFileName);
    } else {
        // For root and normal pages (index.json, blog.json)
        filePath = path.join(__dirname, '.next', 'server', 'pages', jsonFileName);
    }

    contentType = 'application/json';
  } else {
    // This is a request for an HTML page (/, /contact, /blog, /blog/slug, /404, /500)
    let fileNameBase;

    if (requestPath === '/') {
      fileNameBase = 'index';
    } else if (requestPath === '/contact') {
      fileNameBase = 'contact';
    } else if (requestPath === '/blog') {
      fileNameBase = 'blog';
    } else if (requestPath === '/404') {
      fileNameBase = '404';
    } else if (requestPath === '/500') {
      fileNameBase = '500';
    } else if (requestPath.startsWith('/blog/')) {
      fileNameBase = requestPath.substring(requestPath.lastIndexOf('/') + 1);
    } else {
      // Fallback for any other direct page, assume it's just the slug
      fileNameBase = requestPath.substring(1);
    }

    // Construct the full file path including the .html extension and correct subfolder
    if (requestPath.startsWith('/blog/') && requestPath !== '/blog') {
      // Path for dynamic blog posts: .next/server/pages/blog/[slug].html
      filePath = path.join(__dirname, '.next', 'server', 'pages', 'blog', fileNameBase + '.html');
    } else {
      // Path for all other static pages: .next/server/pages/[page].html
      filePath = path.join(__dirname, '.next', 'server', 'pages', fileNameBase + '.html');
    }
    contentType = 'text/html';
  }

  console.log(`Attempting to serve: ${filePath} (Original URL: ${req.url})`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error serving ${req.url}: ${err.message}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found (Custom Simple Server)');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Helper function to determine Content-Type based on file extension
function getContentType(filePath) {
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.ico': 'image/x-icon'
  };
  return mimeTypes[extname] || 'application/octet-stream';
}

server.listen(port, () => {
  console.log(`Simple server running at http://localhost:${port}/`);
  console.log(`Your basePath is '${BASE_PATH}'. All URLs should be accessed with this prefix.`);
  console.log(`Try these URLs:`);
  console.log(`- http://localhost:${port}${BASE_PATH}/`);
  console.log(`- http://localhost:${port}${BASE_PATH}/contact`);
  console.log(`- http://localhost:${port}${BASE_PATH}/blog`);
  console.log(`- http://localhost:${port}${BASE_PATH}/blog/the-rise-of-ai-in-software-development-friend-or-foe`);
  console.log(`- http://localhost:${port}${BASE_PATH}/404`);
  console.log(`- http://localhost:${port}${BASE_PATH}/500`);
});