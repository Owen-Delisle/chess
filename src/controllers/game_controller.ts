import { Color } from '../components/piece/color'
import { Move } from '../global_types/move'

export class GameController {
	public static turn = Color.white
	public static move_list: Move[] = []

	public static switch_turn(): void {
		if (GameController.turn == Color.white) {
			GameController.turn = Color.black
		} else {
			GameController.turn = Color.white
		}
	}

	public static add_move_to_list(move: Move) {
		this.move_list.push(move)
	}
}
