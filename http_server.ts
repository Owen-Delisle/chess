import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import path from 'path';
require('dotenv').config();
import bcrypt from 'bcrypt';

const http_server = express();
const PORT = 3000;
const secretKey = process.env.JWT_SECRET;

const dbPromise = open({
    filename: './database/database.db',
    driver: sqlite3.Database
});

http_server.use(express.json());

http_server.use(express.static(path.join(__dirname, 'public')));

http_server.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/pages/signup.html');
});

http_server.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/login.html');
});

http_server.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/pages/dashboard.html');
});

http_server.get('/otb', (req, res) => {
    res.sendFile(__dirname + '/public/pages/otb.html');
});

http_server.get('/online', (req, res) => {
    res.sendFile(__dirname + '/public/pages/online_game.html');
});

http_server.get('/tests', (req, res) => {
    res.sendFile(__dirname + '/public/pages/tests.html');
});

http_server.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const id = uuidv4()
    try {
        const db = await dbPromise;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        console.log("Password:", password, "Salt:", salt)
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.run('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)', [id, username, email, hashedPassword]);

        res.send('User signed up successfully!');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
});

http_server.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Login Called", req.body)
    try {
        // Query database to check if user exists
        const db = await dbPromise;
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                if (secretKey !== undefined) {
                    console.log("Made it to token")
                    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
                    if(jwt.verify(token, secretKey)) {
                        res.json({ token });
                    } else {
                        throw new Error("Could not verify JWT Token")
                    }
                } else {
                    throw new Error("Secret Key was undefined")
                }
            } else {
                res.status(401).send('Invalid Password')
            }
        } else {
            res.status(401).send('Invalid Username');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

http_server.post('/verify_jwt', async(req, res) => {
    const token = req.body
    try {
        if(token && secretKey) {
            console.log("TOKEN:",token,"SECRET_KEY:",secretKey)
            jwt.verify(token, secretKey);
        }
        res.send(true)
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return false;
    }
})

http_server.post('/users', async(req, res) => {
    // Query database to check if user exists
    const db = await dbPromise
    const users = await db.all('SELECT * FROM users')
    
    if(users) {
        console.log(users)
    }
})

export { http_server, PORT }