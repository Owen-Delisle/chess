import { BlackOrWhite } from "../../global_types/enums/black_or_white"
import Board from "../../components/board/board"
import GameType from "../../global_types/enums/game_type"
import { UUID } from "crypto"
import { get_element_by_id, hide_element, show_element } from '../utils/funcs'
import { clear_container_children } from "../utils/funcs"
import PlaceHolderBoard from "../../components/board/placeholder_board"
import UserAPI from "../../server/api/user_api"
import ClientWebSocket from "../../server/client_websocket"
import ResignationMessage from "../../server/messages/resignation_message"
import PlayerController from "../../controllers/player_controller"
import redirect_to_login_page from "../../server/redirects/login"
import OfferDrawMessage from "../../server/messages/offer_draw_message"
import WaitingElement from "../../components/message/waiting"

const board_container: HTMLElement = get_element_by_id("board_container")
const message_container: HTMLElement = get_element_by_id("message_container")

export function instantiate_offline_game() {
    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Offline Game"

    hide_online_elements()

    clear_container_children(message_container)
    clear_container_children(board_container)

    const board: Board = new Board(GameType.offline, BlackOrWhite.white)
    board_container.appendChild(board)

    PlayerController.in_online_game = false
}

export function instantiate_placeholder_board() {
    const board: PlaceHolderBoard = new PlaceHolderBoard()
    
    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Online Game"

    show_user_list()
    show_logout_button()
    show_game_types()
    hide_resign_container()

    PlayerController.in_online_game = false
    PlayerController.opponent_user_id = undefined

    clear_container_children(message_container)
    clear_container_children(board_container)
    board_container.appendChild(board)

    PlayerController.in_online_game = false
}

export async function instantiate_online_game(color: BlackOrWhite, client_id: UUID, opponent_id: UUID) {
    const username: string | undefined = await UserAPI.username_from_id(opponent_id)
    if (!username) {
        throw new Error("Could not query username")
    }

    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = `Online Game vs ${username}`

    show_resign_container()
    hide_user_list()
    hide_game_types()
    hide_logout_button()

    clear_container_children(board_container)
    const board: Board = new Board(GameType.online, color, client_id, opponent_id)
    board_container.appendChild(board)

    PlayerController.in_online_game = true
}

function hide_online_elements() {
    const user_list_container = get_element_by_id("user_list_container")
    const resign_container_element = get_element_by_id("resign_container")

    hide_element(user_list_container)
    hide_element(resign_container_element)
}

function show_user_list() {
    const user_list_container = get_element_by_id("user_list_container")
    show_element(user_list_container)
}

export function hide_user_list() {
    const user_list_container = get_element_by_id("user_list_container")
    hide_element(user_list_container)
}

function show_resign_container() {
    const resign_container_element = get_element_by_id("resign_container")
    show_element(resign_container_element)
}

function hide_resign_container() {
    const resign_container_element = get_element_by_id("resign_container")
    hide_element(resign_container_element)
}

export function hide_game_types() {
    const game_type_container = get_element_by_id("game_type_container")
    hide_element(game_type_container)
}

export function show_game_types() {
    const game_type_container = get_element_by_id("game_type_container")
    show_element(game_type_container)
}

export function resign() {
    ClientWebSocket.send_message_to_server(new ResignationMessage(PlayerController.opponent_user_id as UUID))
    instantiate_placeholder_board()
}

export function offer_draw() {
    const message_container = get_element_by_id('message_container')
    clear_container_children(message_container)

    const waiting_element = new WaitingElement('Draw Offered')
    message_container.appendChild(waiting_element)
    
    ClientWebSocket.send_message_to_server(new OfferDrawMessage(PlayerController.player_id as UUID, PlayerController.opponent_user_id as UUID))
}

export function logout() {
    localStorage.removeItem('jwtToken')
    redirect_to_login_page()
}

function hide_logout_button() {
    const logout_element = get_element_by_id("logout_button")
    hide_element(logout_element)
}

function show_logout_button() {
    const logout_element = get_element_by_id("logout_button")
    show_element(logout_element)
}