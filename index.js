const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css'
};

const server = http.createServer((req, res) => {
  let filePath = '';
  let contentType = 'text/html';

  // Routing for "pretty" URLs
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/about') {
    filePath = path.join(__dirname, 'about.html');
  } else if (req.url === '/contact') {
    filePath = path.join(__dirname, 'contact.html');
  } else {
    // For other requests (like style.css), try to serve the file directly
    filePath = path.join(__dirname, req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, '404.html');
    }
  }

  // Set correct content-type by extension
  const ext = path.extname(filePath);
  contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
