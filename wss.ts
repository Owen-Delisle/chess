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

const active_clients: Set<{user_id: UUID, client: WebSocket}> = new Set()

wss.on('connection', function connection(ws: WebSocket, req: WebSocket.ServerOptions & { url?: string }) {
    const client_connection: WebSocket = ws as WebSocket
    
    const query = req.url ? parse(req.url, true).query : {}
    const token = typeof query === 'object' && 'token' in query ? query['token'] as string : undefined
    let client_user_id: UUID

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
        client_user_id = decoded.userId
        // active_users.add(client_user_id)
        active_clients.add({user_id: client_user_id, client: client_connection})
        send_active_users_to_clients()

    } catch (error) {
        console.error('JWT token verification failed. Connection rejected.', error as VerifyErrors)
        ws.close()
    }

    console.log('Client connected')

    // // Handle messages from clients
    ws.on('message', function incoming(message) {
        console.log('received: %s', message)
        const data = JSON.parse(message.toString())

        console.log("TEEHEE", data.message_type === MessageType.game_request)

        switch(data.message_type) {
            case MessageType.game_request:
                console.log("SERVER RECEIVED GAME REQUEST")
                send_game_request_to_recipient(data.recipient_id)
            break
        }
        console.log("DOODERS", data)
    })

    client_connection.on('close', function() {
        active_clients.forEach((active_client) => {
            // Check if the client matches the client to delete
            if (active_client.client === client_connection) {
                // Delete the element from active_clients
                active_clients.delete(active_client);
            }
        });
        send_active_users_to_clients()
    })
})

function send_active_users_to_clients() {
    const user_ids: UUID[] = [];

    active_clients.forEach(({ user_id }) => {
        user_ids.push(user_id);
    });

    console.log(user_ids);
    // const active_users_array: Array<UUID> = Array.from(active_users)

    const message: ActiveUsersMessage = new ActiveUsersMessage(user_ids)

    // Iterate over all connected clients and send the message to each one
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log("SERVER SENDING MESSAGE")
            client.send(message.json_string())
        }
    })
}

function send_game_request_to_recipient(recipient_id: UUID) {
    const data = {type: '69', requesting_user: "test", request: "test_game_request"}
    const json_data = JSON.stringify(data)
    active_clients.forEach(active_client => {
        if(active_client.user_id === recipient_id) {
            active_client.client.send(json_data)
        }
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export  { wss }
