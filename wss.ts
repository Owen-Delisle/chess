import WebSocket, { Server } from 'ws'
import http from 'http'
import { http_server, PORT } from './http_server.ts'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { parse } from 'url'
import { UUID } from 'crypto'
import ActiveUsersMessage from './src/server/messages/active_users_message.ts'
import { MessageType } from './src/server/messages/message.ts'
require('dotenv').config()

const server = http.createServer(http_server)
const wss = new Server({ server })
const secretKey = process.env.JWT_SECRET
let current_client_user_id: UUID

const active_clients: { [user_id: UUID]: WebSocket } = {};

wss.on('connection', function connection(ws: WebSocket, req: WebSocket.ServerOptions & { url?: string }) {
    const client_connection: WebSocket = ws as WebSocket
    
    const query = req.url ? parse(req.url, true).query : {}
    const token = typeof query === 'object' && 'token' in query ? query['token'] as string : undefined

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
        current_client_user_id = decoded.userId

        active_clients[current_client_user_id] = client_connection
        send_active_users_to_clients()

    } catch (error) {
        console.error('JWT token verification failed. Connection rejected.', error as VerifyErrors)
        ws.close()
    }

    console.log('Client connected')

    // // Handle messages from clients
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message.toString())

        switch(data.message_type) {
            case MessageType.game_request:
                send_game_request_to_recipient(data.recipient_id)
            break
            case MessageType.game_accepted:
                send_game_accepted_to_recipient(data.sender, data.receiver)
            break
        }
    })

    client_connection.on('close', function() {
        Object.keys(active_clients).find(user_id => {
            if(active_clients[user_id] === client_connection) {
                delete active_clients[user_id]
            }
        })
        send_active_users_to_clients()
    })
})

function send_active_users_to_clients() {
    const message: ActiveUsersMessage = new ActiveUsersMessage(Object.keys(active_clients) as UUID[])

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.json_string())
        }
    })
}

function send_game_request_to_recipient(recipient_id: UUID) {
    const data = {type: MessageType.game_request.toString(), requesting_user: current_client_user_id, recieving_user: recipient_id}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_game_accepted_to_recipient(sender: UUID, receiver: UUID) {
    const data = {type: MessageType.game_accepted.toString(), accepting_user: sender}
    const json_data = JSON.stringify(data)

    active_clients[receiver].send(json_data)
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export  { wss }
