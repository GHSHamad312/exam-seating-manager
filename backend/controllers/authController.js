const pool = require('../config/database');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Insert user into database
        await pool.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password]);

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { email, name },
            token: Buffer.from(`${email}:${password}`).toString('base64')
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user in database
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // Check password (plain comparison)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user info and simple token
        res.status(200).json({ 
            message: 'Login successful', 
            user: { email, name: user.name },
            token: Buffer.from(`${email}:${password}`).toString('base64')
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

exports.getUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const token = authHeader.substring(7);
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const email = decoded.split(':')[0];
        
        const [users] = await pool.query('SELECT email, name FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        res.status(200).json({ user: users[0] });
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
