import type { BlackOrWhite } from '../../../global_types/enums/black_or_white'
import Piece from '../piece'
import { PieceDirections } from '../piece_directions'
import type Piece_Interface from '../piece_interface'
import type { PieceType } from '../piece_types'
import type Square from '../../../components/square/square'

export default class Rook extends Piece implements Piece_Interface {
	move_distance: number = 7
	piece_value: number = 5
	directions: PieceDirections[]
	has_moved: boolean = false
	rook_type: RookType

	constructor(
		title: string,
		pos: string,
		svg: string,
		type: PieceType,
		color: BlackOrWhite,
		rook_type: RookType,
	) {
		super(title, type, pos, svg, color)
		this.type = type
		this.directions = [
			PieceDirections.north,
			PieceDirections.east,
			PieceDirections.south,
			PieceDirections.west,
		]
		this.rook_type = rook_type
	}

	public move_to(new_pos: string): Promise<void> {
		return new Promise(async (resolve) => {
			this.pos = new_pos
			this.has_moved = true
			this.possible_moves = []
			resolve()
		})
	}
}

export enum RookType {
	long_rook,
	short_rook,
}
