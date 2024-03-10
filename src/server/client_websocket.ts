import { UUID } from 'crypto'
import GameRequestMessage from './messages/game_request_message'
import Message, { MessageType } from './messages/message'
import GameAcceptedMessage from './messages/game_accepted_message'
import MoveController, { MoveInitiator } from '../controllers/move_controller'
import { Move } from '../global_types/move'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import TokenController from './controllers/token_controller'
import { CastleMove } from '../global_types/castle_move'
import Square from '../components/square/square'
import { CheckStatus } from './messages/king_check_message'
import King from 'src/components/piece/pieces/king'
import { GameEndType, WinOrLose } from 'src/controllers/game_controller'
import PieceList from 'src/models/piece_list'
import PlayerController from './controllers/player_controller'
import GameRequestElement from 'src/components/message/game_request'
import GameRequestState from 'src/global_types/enums/game_request_state'
import WaitingElement from 'src/components/message/waiting'
import GameDeclinedMessage from './messages/game_declined_message'
import GameRequestDeclined from '../components/message/game_request_declined'
import GameCanceledMessage from './messages/game_canceled_message'
import UserAPI from './api/user_api'

export default class ClientWebSocket {
    static token: string | null = localStorage.getItem('jwtToken')
    static client_user_id: Promise<UUID> = ClientWebSocket.user_id_of_client()
    static game_request_state: GameRequestState = GameRequestState.dormant

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

            switch (message_type) {
                case MessageType.active_users.toString():
                    ClientWebSocket.update_active_users_list_ui(message.users)
                    break
                case MessageType.game_request.toString():
                    ClientWebSocket.update_request_list_ui(message.requesting_user, message.recieving_user)
                    break
                case MessageType.game_accepted.toString():
                    ClientWebSocket.update_current_game_ui(message.accepting_user, BlackOrWhite.black)
                    break
                case MessageType.game_declined.toString():
                    ClientWebSocket.swap_waiting_message_to_declined()
                    break
                case MessageType.game_canceled.toString():
                    ClientWebSocket.close_game_request_message()
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
        if (!ClientWebSocket.token) {
            throw new Error('Invalid token')
        }

        const user_id: UUID | null = await TokenController.userID_from_token(ClientWebSocket.token)

        if (!user_id) {
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

        active_users_id.forEach(async user_id => {
            if (client_user_id !== user_id) {
                const list_item = document.createElement('li')
                const typed_user_id: UUID = user_id as UUID

                const username: string | undefined = await UserAPI.username_from_id(typed_user_id)

                if(!username) {
                    throw new Error("Could not query username")
                }

                list_item.textContent = username

                list_item.addEventListener('click', async function () {
                    ClientWebSocket.send_message_to_server(new GameRequestMessage(await ClientWebSocket.client_user_id, typed_user_id))

                    const message_container_element: HTMLElement | null = document.getElementById('message_container')
                    const waiting_element = new WaitingElement(
                        () => {
                            ClientWebSocket.send_message_to_server(new GameCanceledMessage(typed_user_id))
                        }
                    )

                    if (!message_container_element || !waiting_element) {
                        throw new Error("ELEMENT NOT FOUND")
                    }

                    message_container_element.appendChild(waiting_element)
                })

                user_list_element.appendChild(list_item)
            }
        })
    }

    private static update_request_list_ui(user_id_of_requester: UUID, this_client_user_id: UUID) {
        const message_container_element: HTMLElement | null = document.getElementById('message_container')
        if (!message_container_element) {
            throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
        }

        //TODO Change to is in game variable
        if (PlayerController.opponent_user_id === "none") {
            const game_request_element: HTMLElement = new GameRequestElement(
                user_id_of_requester,
                () => {
                    ClientWebSocket.send_message_to_server(new GameAcceptedMessage(this_client_user_id, user_id_of_requester)),
                        ClientWebSocket.update_current_game_ui(user_id_of_requester, BlackOrWhite.white)
                },
                () => {
                    ClientWebSocket.send_message_to_server(new GameDeclinedMessage(user_id_of_requester))
                }
            )
            message_container_element.appendChild(game_request_element)
        }
    }

    private static async update_current_game_ui(user_id_of_opponent: UUID, color: BlackOrWhite) {
        const message_container = document.getElementById("message_container")
        if (!message_container) {
            throw new Error("MESSAGE CONTAINER ELEMENT NOT FOUND")
        }

        message_container.innerHTML = ''

        const current_game_element: HTMLElement | null = document.getElementById('current_game')

        if (!current_game_element) {
            throw new Error('CURRENT GAME ELEMENT NOT FOUND')
        }

        const opponent_id_item = document.createElement('p')

        const username: string | undefined = await UserAPI.username_from_id(user_id_of_opponent)
        if(!username) {
            throw new Error("Could not query username")
        }
        opponent_id_item.textContent = username

        current_game_element.appendChild(opponent_id_item)
        const board_container_element: HTMLElement | null = document.getElementById('board_element_container')

        if (!board_container_element) {
            throw new Error("BOARD CONTAINER ELEMENT NOT FOUND")
        }

        board_container_element.innerHTML = ''
        board_container_element.innerHTML = `<board-element game_type="online" player_color="${color}" opponent_user_id="${user_id_of_opponent}"></board-element>`
    }

    private static swap_waiting_message_to_declined() {
        const message_container = document.getElementById("message_container")
        if (!message_container) {
            throw new Error("MESSAGE CONTAINER ELEMENT NOT FOUND")
        }

        const game_declined_message = new GameRequestDeclined()

        message_container.innerHTML = ''
        message_container.appendChild(game_declined_message)

    }

    private static close_game_request_message() {
        const message_container = document.getElementById("message_container")

        if (!message_container) {
            throw new Error("MESSAGE CONTAINER ELEMENT NOT FOUND")
        }

        message_container.innerHTML = ''
    }

    private static move_piece_with_server_move(move: Move) {
        MoveController.move_piece_to(move, MoveInitiator.server)
    }

    private static castle_with_server_move(castle_move: CastleMove) {
        MoveController.move_castle_pieces(castle_move, MoveInitiator.server)
    }

    private static update_king_square_color_with_server(square: Square, check_status: CheckStatus) {
        const element: HTMLElement | null = document.getElementById(square.square_id)

        if (!element) {
            throw new Error("Square Element is undefined or null")
        }
        if (check_status === CheckStatus.in_check) {
            element.style.backgroundColor = 'red'
        }
        if (check_status === CheckStatus.not_in_check) {
            element.style.backgroundColor = square.default_background
        }
    }

    private static checkmate_from_server(losing_king_id: string, winning_king_id: string) {
        const losing_king: King | undefined = PieceList.piece_by_id(losing_king_id) as King
        const winning_king: King | undefined = PieceList.piece_by_id(winning_king_id) as King

        if (!losing_king || !winning_king) {
            throw new Error("One of the kings is not defined")
        }

        losing_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.lose)
        winning_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.win)
    }
}