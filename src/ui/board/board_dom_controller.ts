import { BlackOrWhite } from "src/global_types/enums/black_or_white"
import Board from "../../components/board/board"
import GameType from "../../global_types/enums/game_type"
import { UUID } from "crypto"
import { get_element_by_id, hide_element } from "../utils/funcs"
import { clear_container_children } from "../utils/funcs"

const container: HTMLElement = get_element_by_id("board_element_container")

export function instantiate_online_game(color: BlackOrWhite, client_id: UUID, opponent_id: UUID) {
    const board: Board = new Board(GameType.online, color, client_id, opponent_id)

    clear_container_children(container)
    container.appendChild(board)
}

export function instantiate_offline_game() {
    console.log("instantiating offline game")

    const color: BlackOrWhite = BlackOrWhite.white
    const client_id: UUID = "123-123-123-123-123"
    const opponent_id: UUID = "123-123-123-123-123"

    const current_game_container = get_element_by_id("current_game")
    const message_container = get_element_by_id("message_container")

    hide_element(current_game_container)
    hide_element(message_container)

    const board: Board = new Board(GameType.offline, color, client_id, opponent_id)

    clear_container_children(container)
    container.appendChild(board)
}


