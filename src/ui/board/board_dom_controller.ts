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

const container: HTMLElement = get_element_by_id("board_element_container")

export function instantiate_offline_game() {
    console.log("instantiating offline game")

    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Offline Game"

    const color: BlackOrWhite = BlackOrWhite.white
    const client_id: UUID = "123-123-123-123-123"
    const opponent_id: UUID = "123-123-123-123-123"

    hide_online_elements()

    const board: Board = new Board(GameType.offline, color, client_id, opponent_id)

    clear_container_children(container)
    container.appendChild(board)
    ClientWebSocket.online_game_board = board
}

export function instantiate_placeholder_board() {
    const board: PlaceHolderBoard = new PlaceHolderBoard()
    
    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = "Online Game"

    show_user_list()

    clear_container_children(container)
    container.appendChild(board)
}

export async function instantiate_online_game(color: BlackOrWhite, client_id: UUID, opponent_id: UUID) {
    console.log("instantiating online game")

    const username: string | undefined = await UserAPI.username_from_id(opponent_id)
    if (!username) {
        throw new Error("Could not query username")
    }

    const game_title_element = get_element_by_id("game_title")
    game_title_element.innerHTML = `Online Game vs ${username}`

    show_resign_button()
    hide_user_list()
    hide_game_types()

    const board: Board = new Board(GameType.online, color, client_id, opponent_id)

    clear_container_children(container)
    container.appendChild(board)

    //TODO MAKE BETTER
    ClientWebSocket.online_game_board = board
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

export function hide_game_types() {
    const game_type_container = get_element_by_id("game_type_container")
    hide_element(game_type_container)
}

export function resign() {
    ClientWebSocket.send_message_to_server(new ResignationMessage(PlayerController.opponent_user_id as UUID))
    window.location.reload()
}