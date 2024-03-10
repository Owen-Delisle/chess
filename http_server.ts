import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import path from 'path'
require('dotenv').config()
import bcrypt from 'bcrypt'

const http_server = express()
const PORT = 3000
const secretKey = process.env.JWT_SECRET

const dbPromise = open({
    filename: './database/database.db',
    driver: sqlite3.Database
})

http_server.use((req, res, next) => {
    // Content Security Policy (CSP) header
    res.setHeader(
        'Content-Security-Policy',
        `default-src 'self'; 
        script-src 'self' https://trusted-scripts.com; 
        style-src 'self' https://trusted-styles.com;`)

    // X-XSS-Protection header
    res.setHeader('X-XSS-Protection', '1 mode=block')

    // X-Content-Type-Options header
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // Strict Transport Security (HSTS) header
    res.setHeader('Strict-Transport-Security', 'max-age=31536000 includeSubDomains')

    // Referrer Policy header
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Call the next middleware in the chain
    next()
})

http_server.use(express.json())

http_server.use(express.static(path.join(__dirname, 'public')))

http_server.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/pages/signup.html')
})

http_server.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/login.html')
})

http_server.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/pages/dashboard.html')
})

http_server.get('/otb', (req, res) => {
    res.sendFile(__dirname + '/public/pages/otb.html')
})

http_server.get('/online', (req, res) => {
    res.sendFile(__dirname + '/public/pages/online_game.html')
})

http_server.get('/tests', (req, res) => {
    res.sendFile(__dirname + '/public/pages/tests.html')
})

http_server.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    const id = uuidv4()
    try {
        const db = await dbPromise
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)

        const hashedPassword = await bcrypt.hash(password, salt)

        await db.run('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)', [id, username, email, hashedPassword])

        res.send('User signed up successfully!')
    } catch (error) {
        console.error('Error signing up user:', error)
        res.status(500).send('Error signing up user')
    }
})

http_server.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        // Query database to check if user exists
        const db = await dbPromise
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username])

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                if (secretKey !== undefined) {
                    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' })
                    if (jwt.verify(token, secretKey)) {
                        res.json({ token })
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
            res.status(401).send('Invalid Username')
        }
    } catch (error) {
        console.error('Error logging in user:', error)
        res.status(500).send('Error logging in user')
    }
})

http_server.post('/username', async (req, res) => {
    const { user_id } = req.body
    try {
        // Query database to check if user exists
        const db = await dbPromise
        const username = await db.get('SELECT username FROM users WHERE id = ?', [user_id])

        if (username) {
            res.json(username)
        } else {
            res.status(401).send('USERNAME NOT FOUND')
        }
    } catch (error) {
        console.error('ERROR QUERYING USERNAME:', error)
        res.status(500).send('Error fetching username from users')
    }
})

http_server.post('/verify_jwt', async (req, res) => {
    if (!secretKey) {
        throw new Error("JWT Environment variable is null")
    }
    try {
        const token = req.body.token
        jwt.verify(token, secretKey) as { [key: string]: any }
        res.json({ success: true })
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // TODO: HANDLE EXPIRED TOKEN
            console.log("EXPIRED TOKEN")
            res.json({ success: false })
        } else if (error instanceof jwt.JsonWebTokenError) {
            // TODO: HANDLE INVALID TOKEN
            console.log("INVALID TOKEN")
            res.json({ success: false })
        } else {
            // TODO: HANDLE ALL OTHER CASES
            console.log("DEFAULT TOKEN ERROR")
            res.json({ success: false })
        }
    }
})

http_server.post('/userID_from_token', async (req, res) => {
    if (!secretKey) {
        throw new Error("JWT Environment variable is null")
    }
    try {
        const token: string = req.body.token
        const decoded: any = jwt.verify(token, secretKey)
        if (decoded && typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
            res.json({ userId: decoded.userId }) 
        }
        return res.json({ userId: null })
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
})

http_server.get('/users', async (req, res) => {
    // Query database to check if user exists
    const db = await dbPromise
    const users = await db.all('SELECT * FROM users')

    if (users) {
        res.json({ users: users})
    }
})

export { http_server, PORT }