// Test script to verify admin login functionality
const https = require('https');

const testLogin = (username, password) => {
    const postData = JSON.stringify({
        username: username,
        password: password
    });

    const options = {
        hostname: 'bombayguardservice.vercel.app',
        port: 443,
        path: '/api/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {


        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log(`\nTest Login - Username: ${username}`);
            console.log(`Status Code: ${res.statusCode}`);
            console.log(`Response: ${data}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
};

// Test with correct credentials
console.log('Testing admin login...');
testLogin('Sundaram', 'CK@454()');

// Test with incorrect credentials
setTimeout(() => {
    testLogin('wrong', 'credentials');
}, 1000);