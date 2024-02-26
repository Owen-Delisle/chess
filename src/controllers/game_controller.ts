import MoveList from '../utils/classes/MoveList'
import { Color, not_color } from '../components/piece/color'
import { Move } from '../global_types/move'
import King from '../components/piece/pieces/king'
import PieceList from '../models/piece_list'
import MoveController from './move_controller'

export class GameController {
	public static turn = Color.white
	public static move_list: MoveList = new MoveList()
	
	private static insufficient_material_value: number = 3

	public static switch_turn(): void {
		if (GameController.turn == Color.white) {
			GameController.turn = Color.black
		} else {
			GameController.turn = Color.white
		}
	}

	public static add_move_to_list(move: Move) {
		this.move_list.add_move(move)
	}

	public static should_game_end(king: King): void {
		if(!PieceList.any_pawns_left_in_game()) {
			if(PieceList.material_value_in_game() <= this.insufficient_material_value) {
				console.log("Game Over: Insufficient Material -- King and Minor Piece")
			}
			if(PieceList.only_same_square_color_bishops_left_in_game()) {
				console.log("Game Over: Insufficient Material -- Same Color Bishops")
			}
		}
		if(king.check_for_checkmate() !== undefined) {
			console.log(king.check_for_checkmate())
			king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.lose)

			const winning_king = PieceList.king_by_color(not_color(king.color))
			winning_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.win)
		}
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
