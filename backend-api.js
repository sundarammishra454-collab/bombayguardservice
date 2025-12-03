const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());

// Dummy admin credentials (replace with a more secure method in a real application)
const adminCredentials = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    
    console.log('Login attempt:', { username, providedPassword: password ? '***' : 'empty' });
    console.log('Expected credentials:', { username: adminCredentials.username, password: adminCredentials.password ? '***' : 'empty' });

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    if (username === adminCredentials.username && password === adminCredentials.password) {
        console.log('Login successful');
        res.json({ success: true, message: 'Login successful' });
    } else {
        console.log('Login failed - invalid credentials');
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Admin credentials: Username=${adminCredentials.username}`);
    console.log('Health check available at: http://localhost:3000/health');
});
