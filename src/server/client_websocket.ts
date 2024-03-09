import { UUID } from 'crypto'
import GameRequestMessage from './messages/game_request_message'
import Message, { MessageType } from './messages/message'
import htmx from 'htmx.org'
import GameAcceptedMessage from './messages/game_accepted_message'
import MoveController, { MoveInitiator } from '../controllers/move_controller'
import { Move } from '../global_types/move'
import Piece from '../components/piece/piece'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import TokenController from './controllers/token_controller'
import { CastleMove } from '../global_types/castle_move'
import Square from '../components/square/square'
import { CheckStatus } from './messages/king_check_message'
import King from 'src/components/piece/pieces/king'
import { GameEndType, WinOrLose } from 'src/controllers/game_controller'
import PieceList from 'src/models/piece_list'

export default class ClientWebSocket {
    static token: string | null = localStorage.getItem('jwtToken')
    static client_user_id: Promise<UUID> = ClientWebSocket.user_id_of_client()

    //TODO:: UPDATE WHEN DEPLOYED
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`)

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
                    ClientWebSocket.move_piece_with_server_move(message.move)
                break
                case MessageType.castle_move.toString():
                    ClientWebSocket.castle_with_server_move(message.castle_move)
                break
                case MessageType.king_check_status.toString():
                    ClientWebSocket.update_king_square_color_with_server(message.square, message.check_status)
                break
                case MessageType.checkmate.toString():
                    ClientWebSocket.checkmate_from_server(message.losing_king_id, message.winning_king_id)
                break
            }
        })
    }

    private static async user_id_of_client(): Promise<UUID> {
        if(!ClientWebSocket.token) {
            throw new Error('Invalid token')
        }

        const user_id: UUID | null = await TokenController.userID_from_token(ClientWebSocket.token)

        if(!user_id) {
            throw new Error("Could not decode UserID from token")
        }

        return user_id
    }

    public static send_message_to_server(message: Message) {
        const message_to_send = JSON.stringify(message)
        
        ClientWebSocket.web_socket.send(message_to_send)
    }

    private static async update_active_users_list_ui(active_users_id: string[]) {
        const client_user_id: UUID = await ClientWebSocket.client_user_id
        const user_list_element: HTMLElement | null = document.getElementById('user_list')
        if (!user_list_element) {
            throw new Error('USERS LIST ELEMENT NOT FOUND')
        }

        user_list_element.innerHTML = ''

        active_users_id.forEach(user_id => {
            if(client_user_id !== user_id) {
                const list_item = document.createElement('li')
                const typed_user_id: UUID = user_id as UUID
                list_item.textContent = typed_user_id
                list_item.addEventListener('click', async function () {
                    ClientWebSocket.send_message_to_server(new GameRequestMessage(await ClientWebSocket.client_user_id, typed_user_id))

                })
                user_list_element.appendChild(list_item)
            }
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
        MoveController.move_piece_to(move, MoveInitiator.server)
    }

    private static castle_with_server_move(castle_move: CastleMove) {
        MoveController.move_castle_pieces(castle_move, MoveInitiator.server)
    }

    private static update_king_square_color_with_server(square: Square, check_status: CheckStatus) {
        const element: HTMLElement | null = document.getElementById(square.square_id)
        
        if(!element) {
            throw new Error("Square Element is undefined or null")
        }
        if(check_status === CheckStatus.in_check) {
            element.style.backgroundColor = 'red'
        }
        if(check_status === CheckStatus.not_in_check) {
            element.style.backgroundColor = square.default_background
        }
    } 

    private static checkmate_from_server(losing_king_id: string, winning_king_id: string) {
        const losing_king: King | undefined = PieceList.piece_by_id(losing_king_id) as King
        const winning_king: King | undefined = PieceList.piece_by_id(winning_king_id) as King

        if(!losing_king || !winning_king) {
            throw new Error("One of the kings is not defined")
        }

        losing_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.lose)
        winning_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.win)
    }
}