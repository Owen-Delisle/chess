import WebSocket, { Server } from 'ws'
import http from 'http'
import { http_server, PORT } from './http_server.ts'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { parse } from 'url'
import { UUID } from 'crypto'
import { MessageType } from './src/server/messages/message.ts'
import { Move } from './src/global_types/move.ts'
import { CastleMove } from './src/global_types/castle_move.ts'
import { CheckStatus } from './src/server/messages/king_check_message.ts'
import Square from './src/components/square/square.ts'
import { BlackOrWhite } from './src/global_types/enums/black_or_white.ts'
require('dotenv').config()

const server = http.createServer(http_server)
const wss = new Server({ server })
const secretKey = process.env.JWT_SECRET

const active_clients: { [user_id: UUID]: WebSocket } = {};

wss.on('connection', function connection(ws: WebSocket, req: WebSocket.ServerOptions & { url?: string }) {
    const client_connection: WebSocket = ws as WebSocket

    update_active_users_table(client_connection, req)
    send_active_users_to_clients()

    // Handle messages from clients
    client_connection.on('message', function incoming(message) {
        const data = JSON.parse(message.toString())

        switch(data.message_type) {
            case MessageType.game_request:
                send_game_request_to_recipient(data.sender, data.recipient_id)
            break
            case MessageType.game_accepted:
                send_game_accepted_to_recipient(data.sender, data.receiver, data.color)
            break
            case MessageType.game_declined:
                send_game_declined_to_recipient(data.receiver, data.message)
            break
            case MessageType.game_canceled:
                send_game_canceled_to_recipient(data.receiver)
            break
            case MessageType.move:
                send_move_to_recipient(data.recipient_id, data.move)
            break
            case MessageType.castle_move:
                send_castle_move_to_recipient(data.recipient_id, data.castle_move)
            break
            case MessageType.en_passant:
                send_en_passant_to_recipient(data.recipient_id, data.pawn_to_take_pos)
            break
            case MessageType.king_check_status:
                send_check_status_to_recipient(data.recipient_id, data.square_id, data.check_status)
            break
            case MessageType.checkmate:
                send_checkmate_to_recipient(data.sender_id, data.recipient_id, data.losing_king_id, data.winning_king_id)
            break
            case MessageType.resignation:
                send_resignation_message_to_recipient(data.recipient_id)
            break
            case MessageType.active_games:
                send_active_users_to_clients()
            break
        }
    })

    client_connection.on('close', function() {
        console.log('Client Closed Connection')
        Object.keys(active_clients).find(user_id => {
            if(active_clients[user_id] === client_connection) {
                delete active_clients[user_id]
                send_lost_connection_to_clients(user_id as UUID)
            }
        })
        send_active_users_to_clients()
    })
})

function update_active_users_table(client_connection: WebSocket, req: WebSocket.ServerOptions & { url?: string }) {
    const query = req.url ? parse(req.url, true).query : {}
    const token = typeof query === 'object' && 'token' in query ? query['token'] as string : undefined

    try {
        if(!secretKey) {
            throw new Error("Secret Key was undefined")
        }

        const decoded = jwt.verify(token!, secretKey) as { [key: string]: any }
        const user_id = decoded.userId

        if(active_clients[user_id] !== undefined) {
            send_logout_message_to_client(user_id)
        }

        active_clients[user_id] = client_connection

    } catch (error) {
        console.error('JWT token malformed. Connection rejected.', error as VerifyErrors)
        client_connection.close()
    }

    console.log('Client connected')
}

//TODO:: Probably shouldnt be sending the whole list every time
function send_active_users_to_clients() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: MessageType.active_users.toString(), users: Object.keys(active_clients) }))
        }
    })
}

function send_lost_connection_to_clients(user_id: UUID) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: MessageType.connection_lost.toString(), user_id: user_id }))
        }
    })
}

function send_game_request_to_recipient(sender: UUID, recipient_id: UUID) {
    const data = {type: MessageType.game_request.toString(), requesting_user: sender, recieving_user: recipient_id}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_game_accepted_to_recipient(sender: UUID, receiver: UUID, color: BlackOrWhite) {
    const data = {type: MessageType.game_accepted.toString(), accepting_user: sender, color: color}
    const json_data = JSON.stringify(data)

    active_clients[receiver].send(json_data)
}

function send_game_declined_to_recipient(receiver: UUID, message: string) {
    const data = {type: MessageType.game_declined.toString(), message}
    const json_data = JSON.stringify(data)

    active_clients[receiver].send(json_data)
}

function send_game_canceled_to_recipient(receiver: UUID) {
    const data = {type: MessageType.game_canceled.toString()}
    const json_data = JSON.stringify(data)

    active_clients[receiver].send(json_data)
}

function send_move_to_recipient(recipient_id: UUID, move: Move) {
    const data = {type: MessageType.move.toString(), move}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_castle_move_to_recipient(recipient_id: UUID, castle_move: CastleMove) {
    const data = {type: MessageType.castle_move.toString(), castle_move}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_en_passant_to_recipient(recipient_id: UUID, pawn_to_take_pos: string) {
    const data = {type: MessageType.en_passant.toString(), pawn_to_take_pos}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_check_status_to_recipient(recipient_id: UUID, square_id: string, check_status: CheckStatus) {
    const data = {type: MessageType.king_check_status.toString(), square_id, check_status}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_checkmate_to_recipient(sender_id: UUID, recipient_id: UUID, losing_king_id: string, winning_king_id: string) {
    const data = {type: MessageType.checkmate.toString(), sender_id, recipient_id, losing_king_id, winning_king_id}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_resignation_message_to_recipient(recipient_id: UUID) {
    const data = {type: MessageType.resignation.toString(), recipient_id}
    const json_data = JSON.stringify(data)

    active_clients[recipient_id].send(json_data)
}

function send_logout_message_to_client(user_id: UUID) {
    const data = {type: MessageType.logout.toString()}
    const json_data = JSON.stringify(data)

    active_clients[user_id].send(json_data)
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export  { wss }
