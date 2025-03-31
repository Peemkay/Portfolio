const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;

// Get local IP address - improved version
const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName of Object.keys(interfaces)) {
        const interfaceInfo = interfaces[interfaceName];
        for (const info of interfaceInfo) {
            if (!info.internal && info.family === 'IPv4') {
                console.log(`Found network interface: ${interfaceName} with IP: ${info.address}`);
                return info.address;
            }
        }
    }
    console.log('No suitable network interface found, falling back to localhost');
    return 'localhost';
};

const LOCAL_IP = getLocalIP();

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.mp3': 'audio/mpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'font/eot'
};

// Create server with detailed logging
const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url} from ${req.socket.remoteAddress}`);
    
    let filePath = '.' + decodeURIComponent(req.url.split('?')[0]);
    
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error(`Error serving ${filePath}:`, error);
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 - File Not Found');
            } else {
                res.writeHead(500);
                res.end('500 - Internal Server Error');
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
            console.log(`Successfully served: ${filePath}`);
        }
    });
});

// Improved error handling
server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try:`);
        console.error(`1. Stop any other servers running on port ${PORT}`);
        console.error(`2. Wait a few seconds and try again`);
        console.error(`3. Or use a different port by changing the PORT constant`);
    } else if (error.code === 'EACCES') {
        console.error(`Permission denied to bind to port ${PORT}`);
        console.error('Try running with administrator privileges');
    }
    process.exit(1);
});

// Start server with detailed logging
server.listen(PORT, '0.0.0.0', () => {
    console.log('\n=== Server Details ===');
    console.log(`Local IP: ${LOCAL_IP}`);
    console.log(`Port: ${PORT}`);
    console.log('\nServer running at:');
    console.log(`- Local: http://localhost:${PORT}/`);
    console.log(`- Network: http://172.20.10.10:${PORT}/`);  // Your specific IP
    console.log('\nTroubleshooting Tips:');
    console.log('1. Make sure your firewall allows incoming connections on port 3000');
    console.log('2. Both devices must be on the same network');
    console.log('3. Try accessing the Network URL from another device');
    console.log('\nPress Ctrl+C to stop\n');
});




