import WebSocket, { Server } from 'ws'
import http from 'http'
import { http_server, PORT } from './http_server.ts'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { parse } from 'url'
import { UUID } from 'crypto'
require('dotenv').config()

const server = http.createServer(http_server)
const wss = new Server({ server })
const clients: Set<WebSocket> = new Set()
const secretKey = process.env.JWT_SECRET
const active_users: Set<UUID> = new Set()

wss.on('connection', function connection(ws: WebSocket, req: WebSocket.ServerOptions & { url?: string }) {
    const query = req.url ? parse(req.url, true).query : {}
    const token = typeof query === 'object' && 'token' in query ? query['token'] as string : undefined
    let client_userId: UUID

    if (!token) {
        console.log('No token provided. Connection rejected.')
        ws.close()
        return
    }

    try {
        if(!secretKey) {
            throw new Error("Secret Key was undefined")
        }
        const decoded = jwt.verify(token, secretKey) as { [key: string]: any }
        client_userId = decoded.userId
        active_users.add(client_userId)
        send_active_users_to_clients(active_users)

    } catch (error) {
        console.error('JWT token verification failed. Connection rejected.', error as VerifyErrors)
        ws.close()
    }

    console.log('Client connected')

    const client_connection: WebSocket = ws as WebSocket
    clients.add(client_connection)

    // Handle messages from clients
    ws.on('message', function incoming(message) {
        // console.log('received: %s', message)
        const data = JSON.parse(message.toString())
        console.log("DATERS", data)
    })

    client_connection.on('close', function() {
        clients.delete(client_connection)
        active_users.delete(client_userId)
        send_active_users_to_clients(active_users)
    })
})

function send_active_users_to_clients(active_users: Set<UUID>) {
    console.log("SERVER ACTIVE USERS", active_users)
    const active_users_array: Array<UUID> = Array.from(active_users)
    const message: string = JSON.stringify({ type: 'active_users', users: active_users_array })

    // Iterate over all connected clients and send the message to each one
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log("SERVER SENDING MESSAGE")
            console.log('MESSAGE SENT FROM SERVER', message)
            client.send(message)
        }
    })
}

http_server.get('/active_users', (req, res) => {
    res.json(Array.from(active_users))
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export  { wss, active_users }
