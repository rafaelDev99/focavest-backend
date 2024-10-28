const http = require('http');
const express = require('express');

const app = express();

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const port = 3000;

server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});