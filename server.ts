import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import path from 'path';

const app = express();
const PORT = 3000;
const secretKey = 'your_secret_key';

const dbPromise = open({
    filename: './database/database.db',
    driver: sqlite3.Database
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/pages/signup.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/login.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/pages/index.html');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const id = uuidv4()
    try {
        const db = await dbPromise;
        await db.run('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)', [id, username, email, password]);
        
        res.send('User signed up successfully!');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
	console.log("Login Called", req.body)
    try {
        // Query database to check if user exists
        const db = await dbPromise;
        const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (user) {
			const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});