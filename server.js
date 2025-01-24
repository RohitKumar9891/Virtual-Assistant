import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { db } from './database.js';

const app = express();
const PORT = 3001;

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    db.get(
        `SELECT password FROM users WHERE email = ? OR phone = ?`,
        [emailOrPhone, emailOrPhone],
        function (err, row) {
            if (err) {
                return res.status(500).json({ success: false, error: 'Database error: ' + err.message });
            }

            if (!row) {
                return res.status(404).json({ success: false, error: 'User not found.' });
            }

            // Compare the stored hash with the provided password
            bcrypt.compare(password, row.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, error: 'Error comparing passwords: ' + err.message });
                }

                if (result) {
                    // Password matches
                    return res.json({ success: true, message: 'Login successful!' });
                } else {
                    // Password doesn't match
                    return res.status(401).json({ success: false, error: 'Invalid credentials.' });
                }
            });
        }
    );
});

// Serve the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Register route
app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body;

    console.log('Received data:', { name, email, phone, password });

    // Validate inputs
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)`,
        [name, email, phone, hashedPassword],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, error: 'Database error: ' + err.message });
            }
            res.json({ success: true});
        }
    );
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
