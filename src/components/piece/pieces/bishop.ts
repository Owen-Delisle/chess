import Piece from '../piece'
import { PieceDirections, piece_direction_modifier } from '../piece_directions'
import type Piece_Interface from '../piece_interface'
import type { PieceType } from '../piece_types'
import type { Color } from '../color'
import SquareGrid from '../../../models/square_grid'

export default class Bishop extends Piece implements Piece_Interface {
	move_distance: number = 7
	directions: PieceDirections[]

	constructor(
		title: string,
		pos: string,
		svg: string,
		type: PieceType,
		color: Color,
	) {
		super(title, type, pos, svg, color)
		this.type = type
		this.directions = [
			PieceDirections.north_east,
			PieceDirections.south_east,
			PieceDirections.south_west,
			PieceDirections.north_west,
		]
	}
}
