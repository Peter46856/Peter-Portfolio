// check-file.js (UPDATED TO LOOK FOR index.html)
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '.next', 'server', 'pages', 'index.html'); // *** CHANGED TO index.html ***

fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
  if (err) {
    console.error(`Error accessing file ${filePath}:`);
    console.error(`Code: ${err.code}`); // Will be ENOENT or EACCES
    console.error(`Message: ${err.message}`);
    console.error(`Full Error:`, err);
  } else {
    console.log(`Success! File ${filePath} exists and is readable.`);
    // Try reading it now
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error(`Error reading file ${filePath}:`);
        console.error(`Code: ${readErr.code}`);
        console.error(`Message: ${readErr.message}`);
        console.error(`Full Error:`, readErr);
      } else {
        console.log(`Successfully read content (first 100 chars):\n${data.substring(0, 100)}...`);
      }
    });
  }
});

console.log("Attempting file access check...");