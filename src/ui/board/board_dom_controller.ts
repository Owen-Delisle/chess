import { BlackOrWhite } from "src/global_types/enums/black_or_white"
import Board from "../../components/board/board"
import GameType from "../../global_types/enums/game_type"
import { UUID } from "crypto"
import { get_element_by_id, hide_element, show_element } from "../utils/funcs"
import { clear_container_children } from "../utils/funcs"
import PlaceHolderBoard from "src/components/board/placeholder_board"
import UserAPI from "src/server/api/user_api"
import ClientWebSocket from "src/server/client_websocket"
import ResignationMessage from "src/server/messages/resignation_message"
import PlayerController from "src/controllers/player_controller"
import redirect_to_login_page from "src/server/redirects/login"

const offline_board_container: HTMLElement = get_element_by_id("offline_board_container")
const placeholder_board_container: HTMLElement = get_element_by_id("placeholder_board_container")
const online_board_container: HTMLElement = get_element_by_id("online_board_container")

const message_container: HTMLElement = get_element_by_id("message_container")

export function instantiate_offline_game() {
    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Offline Game"

    hide_online_elements()

    clear_container_children(offline_board_container)

    const board: Board = new Board(GameType.offline, BlackOrWhite.white)
    offline_board_container.appendChild(board)

    board.redraw()

    show_element(offline_board_container)
    hide_element(placeholder_board_container)
    hide_element(online_board_container)
}

export function instantiate_placeholder_board() {
    const board: PlaceHolderBoard = new PlaceHolderBoard()
    
    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Online Game"

    show_user_list()
    show_logout_button()
    show_game_types()
    hide_resign_button()

    PlayerController.in_online_game = false
    PlayerController.opponent_user_id = undefined

    clear_container_children(message_container)
    clear_container_children(placeholder_board_container)
    placeholder_board_container.appendChild(board)

    hide_element(offline_board_container)
    show_element(placeholder_board_container)
    hide_element(online_board_container)
}

export async function instantiate_online_game(color: BlackOrWhite, client_id: UUID, opponent_id: UUID) {
    const username: string | undefined = await UserAPI.username_from_id(opponent_id)
    if (!username) {
        throw new Error("Could not query username")
    }

    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = `Online Game vs ${username}`

    show_resign_button()
    hide_user_list()
    hide_game_types()
    hide_logout_button()

    clear_container_children(online_board_container)
    const board: Board = new Board(GameType.online, color, client_id, opponent_id)
    online_board_container.appendChild(board)

    board.redraw()

    PlayerController.in_online_game = true

    hide_element(offline_board_container)
    hide_element(placeholder_board_container)
    show_element(online_board_container)
}

function hide_online_elements() {
    const user_list_container = get_element_by_id("user_list_container")
    const resign_button_element = get_element_by_id("resign_button")

    hide_element(user_list_container)
    hide_element(resign_button_element)
}

function show_user_list() {
    const user_list_container = get_element_by_id("user_list_container")
    show_element(user_list_container)
}

export function hide_user_list() {
    const user_list_container = get_element_by_id("user_list_container")
    hide_element(user_list_container)
}

function show_resign_button() {
    const resign_button_element = get_element_by_id("resign_button")
    show_element(resign_button_element)
}

function hide_resign_button() {
    const resign_button_element = get_element_by_id("resign_button")
    hide_element(resign_button_element)
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