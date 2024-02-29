import MoveList from '../utils/classes/MoveList'
import { Color, not_color } from '../components/piece/color'
import { Move } from '../global_types/move'
import King from '../components/piece/pieces/king'
import PieceList from '../models/piece_list'
import Piece from '../components/piece/piece'
import MoveController from './move_controller'

export class GameController {
	public static game_type: GameType
	public static turn = Color.white
	public static move_list: MoveList = new MoveList()
	
	private static insufficient_material_value: number = 3
	private static count: number = 0

	public static switch_turn(): void {
		switch(this.game_type) {
			case GameType.online:
				this.online_turn_switch()
				// this.offline_turn_switch()
				break
			case GameType.offline:
				this.offline_turn_switch()
				break

			default:
				throw new Error("Gametype in switch_turn not recognized")
		}
	}

	public static offline_turn_switch() {
		if (GameController.turn == Color.white) {
			GameController.turn = Color.black
		} else {
			GameController.turn = Color.white
		}
	}

	public static online_turn_switch() {
		// TODO
		// Send last move
		// Wait for next move
		// Update move controller with new move

		if(this.count <=0 ) {
			const piece: Piece = PieceList.piece_by_position('E7')!
			MoveController.move_piece_to('E5', piece)
			this.count++
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

export enum GameType {
	online = "online",
	offline = "offline"
}
