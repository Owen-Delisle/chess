import type { Color } from '../color'
import Piece from '../piece'
import type Piece_Interface from '../piece_interface'
import type { PieceType } from '../piece_types'
import { PieceDirections, piece_direction_modifier } from '../piece_directions'
import SquareGrid from '../../../models/square_grid'

export default class Knight extends Piece implements Piece_Interface {
	move_distance: number = 1
	directions: PieceDirections[]

	constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
		super(title, type, pos, svg, color)
		this.type = type
		this.directions = [
			PieceDirections.up_right,
			PieceDirections.right_up,
			PieceDirections.right_down,
			PieceDirections.down_right,
			PieceDirections.down_left,
			PieceDirections.left_down,
			PieceDirections.left_up,
			PieceDirections.up_left,
		]
	}
}
