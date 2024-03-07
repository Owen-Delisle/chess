import { UUID } from 'crypto'
import GameRequestMessage from './messages/game_request_message'
import Message, { MessageType } from './messages/message'
import htmx from 'htmx.org'
import GameAcceptedMessage from './messages/game_accepted_message'
import MoveController, { MoveInitiator } from '../controllers/move_controller'
import { Move } from '../global_types/move'
import Piece from '../components/piece/piece'
import { BlackOrWhite } from '../components/square/color'
import web_socket from './scripts/ws_connection'

export default class ClientWebSocket {
    static token = localStorage.getItem('jwtToken')

    //TODO:: UPDATE WHEN DEPLOYED
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`)
    // static web_socket: WebSocket = web_socket

    public static open_connection(): void {
        ClientWebSocket.web_socket.addEventListener('open', function (event) {
            console.log('Client WebSocket connection established')
        })

        ClientWebSocket.web_socket.addEventListener('message', function (event) {
            console.log('Event from WSS:', event.data)
            const message = JSON.parse(event.data)
            const message_type: string = message.type

            switch(message_type) {
                case MessageType.active_users.toString():
                    const active_users = message.users
                    ClientWebSocket.update_active_users_list_ui(active_users)
                break
                case MessageType.game_request.toString():
                    ClientWebSocket.update_request_list_ui(message.requesting_user, message.recieving_user)
                break
                case MessageType.game_accepted.toString():
                    ClientWebSocket.update_current_game_ui(message.accepting_user, BlackOrWhite.black)
                break
                case MessageType.move.toString():
                    console.log("CLIENT RECEIVED MOVE")
                    ClientWebSocket.move_piece_with_server_move(message.move)
                break
            }
        })
    }

    public static send_message_to_server(message: Message) {
        console.log("CLIENT SENDING MESSAGE")
        console.log(message)
        const message_to_send = JSON.stringify(message)
        
        ClientWebSocket.web_socket.send(message_to_send)
    }

    private static update_active_users_list_ui(active_users_id: string[]) {
        const user_list_element: HTMLElement | null = document.getElementById('user_list')
        if (!user_list_element) {
            throw new Error('USERS LIST ELEMENT NOT FOUND')
        }

        user_list_element.innerHTML = ''

        active_users_id.forEach(user_id => {
            const list_item = document.createElement('li')
            const typed_user_id: UUID = user_id as UUID
            list_item.textContent = typed_user_id
            list_item.addEventListener('click', function () {
                ClientWebSocket.send_message_to_server(new GameRequestMessage(typed_user_id))

            })
            user_list_element.appendChild(list_item)
        })
    }

    private static update_request_list_ui(user_id_of_requester: UUID, this_client_user_id: UUID) {
        const game_request_list_element: HTMLElement | null = document.getElementById('game_request_list')
        if (!game_request_list_element) {
            throw new Error('GAME REQUEST ELEMENT LIST NOT FOUND')
        }

        game_request_list_element.innerHTML = ''

        const list_item = document.createElement('li')
        list_item.textContent = user_id_of_requester

        list_item.addEventListener('click', function () {
            ClientWebSocket.send_message_to_server(new GameAcceptedMessage(this_client_user_id, user_id_of_requester))
            ClientWebSocket.update_current_game_ui(user_id_of_requester, BlackOrWhite.white)
        })

        game_request_list_element.appendChild(list_item)
    }

    private static update_current_game_ui(user_id_of_opponent: UUID, color: BlackOrWhite) {
        const current_game_element: HTMLElement | null = document.getElementById('current_game')

        if (!current_game_element) {
            throw new Error('CURRENT GAME ELEMENT NOT FOUND')
        }

        const opponent_id_item = document.createElement('p')
        opponent_id_item.textContent = user_id_of_opponent
        current_game_element.appendChild(opponent_id_item)

        const board_container_element: HTMLElement | null = document.getElementById('board_element_container')

        if(!board_container_element) {
            throw new Error("BOARD CONTAINER ELEMENT NOT FOUND")
        }

        board_container_element.innerHTML = `<board-element game_type="online" player_color="${color}" opponent_user_id="${user_id_of_opponent}"></board-element>`
    }

    private static move_piece_with_server_move(move: Move) {
        const new_pos: string = move.to
        const piece: Piece = move.piece
        console.log("PIECE TO MOVE", move.piece)
        MoveController.move_piece_to(new_pos, piece, MoveInitiator.server)
    }
}