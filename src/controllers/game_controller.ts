import MoveList from '../utils/classes/move_list'
import { BlackOrWhite, not_color } from '../global_types/enums/black_or_white'
import { Move } from '../global_types/move'
import King from '../components/piece/pieces/king'
import PieceList from '../models/piece_list'
import GameType from '../global_types/enums/game_type'
import ClientWebSocket from '../server/client_websocket'
import CheckmateMessage from '../server/messages/checkmate_message'
import PlayerController from '../server/controllers/player_controller'
import { UUID } from 'crypto'
import CheckmateElement from '../components/message/checkmate'

export class GameController {
	public static game_type: GameType
	public static turn = BlackOrWhite.white
	public static move_list: MoveList = new MoveList()
	
	private static insufficient_material_value: number = 3

	public static switch_turn(): void {
		if (GameController.turn == BlackOrWhite.white) {
			GameController.turn = BlackOrWhite.black
		} else {
			GameController.turn = BlackOrWhite.white
		}
	}

	public static add_move_to_list(move: Move) {
		this.move_list.add_move(move)
	}

	public static should_game_end(king: King): void {
		// if(!PieceList.any_pawns_left_in_game()) {
		// 	if(PieceList.material_value_in_game() <= this.insufficient_material_value) {
		// 		console.log("Game Over: Insufficient Material -- King and Minor Piece")
		// 	}
		// 	if(PieceList.only_same_square_color_bishops_left_in_game()) {
		// 		console.log("Game Over: Insufficient Material -- Same Color Bishops")
		// 	}
		// }
		// if(king.check_for_checkmate() !== undefined) {
		// 	console.log(king.check_for_checkmate())
		// 	king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.lose)

		// 	const winning_king = PieceList.king_by_color(not_color(king.color))
		// 	winning_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.win)

		// 	if(this.game_type === GameType.online) {
		// 		ClientWebSocket.send_message_to_server(new CheckmateMessage(PlayerController.opponent_user_id as UUID, king.title, winning_king.title))

		// 		//TODO MAKE FUNCTION
		// 		const message_container_element: HTMLElement | null = document.getElementById('message_container')
		// 		if (!message_container_element) {
		// 			throw new Error('MESSAGE CONTAINER ELEMENT NOT FOUND')
		// 		}
		// 		const checkmate_window = new CheckmateElement()
		// 		setTimeout(() => {
		// 			message_container_element.appendChild(checkmate_window)
		// 		}, 1000);

		// 		//END MAKE FUNCTION
		// 	}
		// }
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
