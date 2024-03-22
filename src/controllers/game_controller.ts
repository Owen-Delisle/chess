import MoveList from '../utils/classes/move_list'
import { BlackOrWhite, not_color } from '../global_types/enums/black_or_white'
import { Move } from '../global_types/move'
import King from '../components/piece/pieces/king'
import GameType from '../global_types/enums/game_type'
import ClientWebSocket from '../server/client_websocket'
import CheckmateMessage from '../server/messages/checkmate_message'
import PlayerController from './player_controller'
import { UUID } from 'crypto'
import GameOverElement from '../components/message/game_over'
import PieceList from '../models/piece_list'
import Board from 'src/components/board/board'
import SquareGrid from 'src/models/square_grid'
import DrawMessage from 'src/server/messages/draw_message'
import { get_element_by_id } from 'src/ui/utils/funcs'

export class GameController {
	public game_type: GameType
	public turn = BlackOrWhite.white
	public move_list: MoveList = new MoveList()
	square_grid: SquareGrid
	piece_list: PieceList
	
	private insufficient_material_value: number = 3

	constructor(square_grid: SquareGrid, piece_list: PieceList, game_type: GameType) {
		this.square_grid = square_grid
		this.piece_list = piece_list
		this.game_type = game_type
	}

	public switch_turn(): void {
		this.turn = not_color(this.turn)

		if(this.game_type === GameType.offline) {
			PlayerController.player_color = not_color(PlayerController.player_color)
		}

		this.redraw_game_board()
	}

	private redraw_game_board() {
		const board_element: HTMLElement | null = document.querySelector('board-element')
		if(!board_element) {
			throw new Error('couldnt find board element in dom')
		}
		const board: Board = board_element as Board
		board.redraw()
	}

	public add_move_to_list(move: Move) {
		this.move_list.add_move(move)
	}

	public should_game_end(king: King): void {
		if(this.check_for_stalemate()) {
			if(this.game_type === GameType.online) {
				const message = "Draw -- Insufficient Material"
				ClientWebSocket.send_message_to_server(new DrawMessage(PlayerController.opponent_user_id as UUID, message))
			}
		}

		if(king.check_for_checkmate(this.piece_list) === GameEndType.checkmate) {
			king.switch_image_with_endgame_image(this.square_grid, GameEndType.checkmate, WinOrLose.lose)

			const winning_king = this.piece_list.king_by_color(not_color(king.color))
			winning_king.switch_image_with_endgame_image(this.square_grid, GameEndType.checkmate, WinOrLose.win)

			if(this.game_type === GameType.online) {
				const message: CheckmateMessage = new CheckmateMessage(PlayerController.player_id, PlayerController.opponent_user_id as UUID, king.title, winning_king.title)
				ClientWebSocket.send_message_to_server(message)
				this.show_checkmate_message()
			}
		}
		if(king.check_for_checkmate(this.piece_list) === GameEndType.stalemate) {
			if(this.game_type === GameType.online) {
				const message = "Stalemate"
				ClientWebSocket.send_message_to_server(new DrawMessage(PlayerController.opponent_user_id as UUID, message))
			}
		}
	}

	// public for testing
	public check_for_stalemate(): boolean {
		if(!this.piece_list.any_pawns_left_in_game()) {
			const low_material: boolean = this.piece_list.material_value_in_game() <= this.insufficient_material_value
			const same_color_bishops: boolean = this.piece_list.only_same_square_color_bishops_left_in_game()

			if(low_material || same_color_bishops) {
				return true
			}
		}
		return false
	}

	private show_checkmate_message(): void {
		const message_container = get_element_by_id('message_container')
		const checkmate_window = new GameOverElement("Checkmate. You Lose.")
		setTimeout(() => {
			message_container.appendChild(checkmate_window)
		}, 1000);
	}
}

export enum GameEndType {
	checkmate,
	stalemate
}

export enum WinOrLose {
	win,
	lose
}
