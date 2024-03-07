import Piece from '../piece'
import type Piece_Interface from '../piece_interface'
import type { PieceType } from '../piece_types'
import { PieceDirections } from '../piece_directions'
import type { BlackOrWhite } from '../../../global_types/enums/black_or_white'

export default class Queen extends Piece implements Piece_Interface {
	move_distance: number = 7
	piece_value: number = 3
	directions: PieceDirections[]

	constructor(title: string, pos: string, svg: string, type: PieceType, color: BlackOrWhite) {
		super(title, type, pos, svg, color)
		this.type = type
		this.directions = [
			PieceDirections.north,
			PieceDirections.north_east,
			PieceDirections.east,
			PieceDirections.south_east,
			PieceDirections.south,
			PieceDirections.south_west,
			PieceDirections.west,
			PieceDirections.north_west,
		]
	}
}
