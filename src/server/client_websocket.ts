import { UUID } from 'crypto'
import GameRequestMessage from './messages/game_request_message'
import Message, { MessageType } from './messages/message'
import GameAcceptedMessage from './messages/game_accepted_message'
import { MoveInitiator } from '../controllers/move_controller'
import { Move } from '../global_types/move'
import { BlackOrWhite, black_or_white_by_index, not_color } from '../global_types/enums/black_or_white'
import TokenAPI from './api/token_api'
import { CastleMove } from '../global_types/castle_move'
import Square from '../components/square/square'
import { CheckStatus } from './messages/king_check_message'
import King from 'src/components/piece/pieces/king'
import { GameEndType, WinOrLose } from 'src/controllers/game_controller'
import GameRequestElement from 'src/components/message/game_request'
import WaitingElement from 'src/components/message/waiting'
import GameDeclinedMessage from './messages/game_declined_message'
import GameRequestDeclined from '../components/message/game_request_declined'
import GameCanceledMessage from './messages/game_canceled_message'
import UserAPI from './api/user_api'
import Board from '../components/board/board'
import GameOverElement from '../components/message/game_over'
import ActiveGamesAPI from './api/active_games_api'
import ActiveGamesMessage from './messages/active_games_message'
import ActiveGame from './types/active_game_type'
import redirect_to_login_page from './redirects/login'
import { hide_game_types, hide_user_list, instantiate_online_game } from '../ui/board/board_dom_controller'
import PlayerController from 'src/controllers/player_controller'
import { clear_container_children, get_element_by_id } from '../ui/utils/funcs'
import { check } from '../utils/colors'

export default class ClientWebSocket {
    static token: string | null = localStorage.getItem('jwtToken')
    static client_user_id: Promise<UUID> = ClientWebSocket.user_id_of_client()
    static requested_games_from: UUID[] = []

    //TODO:: UPDATE WHEN DEPLOYED
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`)

    public static open_connection(): void {
        ClientWebSocket.web_socket.addEventListener('open', async function (event) {
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
                case MessageType.connection_lost.toString():
                    ClientWebSocket.handle_lost_connection(message.user_id)
                    break
                case MessageType.game_request.toString():
                    ClientWebSocket.update_request_list_ui(message.requesting_user, message.recieving_user)
                    break
                case MessageType.game_accepted.toString():
                    ClientWebSocket.update_current_game_ui(message.accepting_user, message.color)
                    break
                case MessageType.game_declined.toString():
                    ClientWebSocket.swap_waiting_message_to_declined(message.message)
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
                case MessageType.en_passant.toString():
                    ClientWebSocket.take_en_passant_pawn(message.pawn_to_take_pos)
                    break
                case MessageType.king_check_status.toString():
                    ClientWebSocket.update_king_square_color_with_server(message.square, message.check_status)
                    break
                case MessageType.checkmate.toString():
                    ClientWebSocket.checkmate_from_server(message.sender_id, message.recipient_id, message.losing_king_id, message.winning_king_id)
                    break
                case MessageType.resignation.toString():
                    ClientWebSocket.resignation_from_server()
                    break
                case MessageType.logout.toString():
                    ClientWebSocket.logout()
                    break
            }
        })
    }

    private static async user_id_of_client(): Promise<UUID> {
        if (!ClientWebSocket.token) {
            redirect_to_login_page()
            throw new Error('Invalid token')
        }

        const user_id: UUID | null = await TokenAPI.userID_from_token(ClientWebSocket.token)

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
                list_item.className = 'active_user_item'
                const typed_user_id: UUID = user_id as UUID

                const username: string | undefined = await UserAPI.username_from_id(typed_user_id)

                if (!username) {
                    throw new Error("Could not query username")
                }

                list_item.textContent = username

                list_item.addEventListener('click', async function() {
                    if (ClientWebSocket.message_channel_open()) {
                        ClientWebSocket.request_game(typed_user_id)
                    }
                })

                user_list_element.appendChild(list_item)
            }
        })
    }

    private static handle_lost_connection(user_id: UUID) {
        if(PlayerController.opponent_user_id === user_id) {
            const message_container_element: HTMLElement | null = document.getElementById('message_container')
            if (!message_container_element) {
                throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
            }

            clear_container_children(message_container_element)
            const game_over_el = new GameOverElement("Lost Connection to Opponent")
            message_container_element.appendChild(game_over_el)
        }
    }

    private static async request_game(recieving_user: UUID) {
        ClientWebSocket.send_message_to_server(new GameRequestMessage(await ClientWebSocket.client_user_id, recieving_user))

        const message_container_element: HTMLElement | null = document.getElementById('message_container')
        const waiting_element = new WaitingElement(
            () => {
                ClientWebSocket.send_message_to_server(new GameCanceledMessage(recieving_user))
            }
        )

        if (!message_container_element || !waiting_element) {
            throw new Error("ELEMENT NOT FOUND")
        }

        message_container_element.appendChild(waiting_element)
    }

    private static async update_request_list_ui(user_id_of_requester: UUID, this_client_user_id: UUID) {
        const message_container_element: HTMLElement | null = document.getElementById('message_container')
        if (!message_container_element) {
            throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
        }

        if (PlayerController.in_online_game) {
            ClientWebSocket.send_message_to_server(new GameDeclinedMessage(user_id_of_requester, 'That User is busy'))
            return
        }

        const game_request_element: HTMLElement = new GameRequestElement(
            user_id_of_requester,
            () => {
                ClientWebSocket.accept_game_button_functions(
                    this_client_user_id, user_id_of_requester, 
                    black_or_white_by_index(Math.round(Math.random()))
                    )
            },
            () => {
                ClientWebSocket.send_message_to_server(new GameDeclinedMessage(user_id_of_requester, 'Game was Declined'))
            }
        )
        ClientWebSocket.requested_games_from.push(user_id_of_requester)
        message_container_element.appendChild(game_request_element)
    }

    private static async accept_game_button_functions(client_id: UUID, sender_id: UUID, player_piece_color: BlackOrWhite) {
        await ActiveGamesAPI.post_active_game(client_id, sender_id)

        const active_games: ActiveGame[] | undefined = await ActiveGamesAPI.active_games()
        ClientWebSocket.send_message_to_server(new GameAcceptedMessage(client_id, sender_id, not_color(player_piece_color))),
        ClientWebSocket.update_current_game_ui(sender_id, player_piece_color)

        ClientWebSocket.requested_games_from.forEach(user_id => {
            if(user_id !== sender_id) {
                ClientWebSocket.send_message_to_server(new GameDeclinedMessage(user_id, 'Game was Declined'))
            }
        })
        ClientWebSocket.requested_games_from = []

        if (active_games) {
            ClientWebSocket.send_message_to_server(new ActiveGamesMessage(active_games))
        }
    }

    private static async update_current_game_ui(user_id_of_opponent: UUID, color: BlackOrWhite) {
        const message_container = document.getElementById("message_container")
        if (!message_container) {
            throw new Error("MESSAGE CONTAINER ELEMENT NOT FOUND")
        }

        message_container.innerHTML = ''

        hide_user_list()
        hide_game_types()

        const client_id: UUID = await ClientWebSocket.client_user_id

        instantiate_online_game(color, client_id, user_id_of_opponent)
    }

    private static swap_waiting_message_to_declined(message: string) {
        const message_container = document.getElementById("message_container")
        if (!message_container) {
            throw new Error("MESSAGE CONTAINER ELEMENT NOT FOUND")
        }

        const game_declined_message = new GameRequestDeclined(message)

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
        this.game_board().move_controller.move_piece_to(move, MoveInitiator.server)
    }

    private static castle_with_server_move(castle_move: CastleMove) {
        this.game_board().move_controller.move_castle_pieces(castle_move, MoveInitiator.server)
    }

    private static take_en_passant_pawn(pawn_to_take_pos: string) {
        this.game_board().piece_list.remove_piece_by_position(pawn_to_take_pos)
    }

    private static update_king_square_color_with_server(square: Square, check_status: CheckStatus) {
        const element: HTMLElement | null = document.getElementById(square.square_id)

        if (!element) {
            throw new Error("Square Element is undefined or null")
        }
        if (check_status === CheckStatus.in_check) {
            element.style.backgroundColor = check
        }
        if (check_status === CheckStatus.not_in_check) {
            element.style.backgroundColor = square.default_background
        }
    }

    private static async checkmate_from_server(sender_id: UUID, recipient_id: UUID, losing_king_id: string, winning_king_id: string) {
        const losing_king: King | undefined = this.game_board().piece_list.piece_by_id(losing_king_id) as King
        const winning_king: King | undefined = this.game_board().piece_list.piece_by_id(winning_king_id) as King

        if (!losing_king || !winning_king) {
            throw new Error("One of the kings is not defined")
        }

        losing_king.switch_image_with_endgame_image(this.game_board().square_grid, GameEndType.checkmate, WinOrLose.lose)
        winning_king.switch_image_with_endgame_image(this.game_board().square_grid, GameEndType.checkmate, WinOrLose.win)

        const message_container_element: HTMLElement | null = document.getElementById('message_container')
        if (!message_container_element) {
            throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
        }

        const checkmate_window = new GameOverElement("Checkmate. You Win.")
        setTimeout(() => {
            clear_container_children(message_container_element)
            message_container_element.appendChild(checkmate_window)
        }, 1000);

        ActiveGamesAPI.delete_active_game(sender_id, recipient_id)
        const active_games: ActiveGame[] | undefined = await ActiveGamesAPI.active_games()

        if (!active_games) {
            throw new Error("Active Games in DB threw error")
        }

        ClientWebSocket.send_message_to_server(new ActiveGamesMessage(active_games))
    }

    private static resignation_from_server() {
        const message_container_element: HTMLElement | null = document.getElementById('message_container')
        if (!message_container_element) {
            throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
        }

        const game_over_window = new GameOverElement("You Won by Resignation")

        clear_container_children(message_container_element)
        message_container_element.appendChild(game_over_window)
    }

    private static message_channel_open(): boolean {
        const message_container = document.getElementById("message_container")
        if (!message_container) {
            throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
        }

        if (message_container.firstElementChild) {
            return false
        }
        return true
    }

    private static game_board(): Board {
        return get_element_by_id("game_board") as Board
    }

    private static logout() {
        alert('Someone else logged in on your account')
        localStorage.removeItem('jwtToken')
        redirect_to_login_page()
    }
}