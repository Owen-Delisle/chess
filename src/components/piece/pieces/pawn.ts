import Piece from '../piece'
import type Piece_Interface from '../piece_interface'
import { PieceType } from '../piece_types'
import SquareGrid from '../../../models/square_grid'
import { PieceDirections, piece_direction_modifier } from '../piece_directions'
import { Color } from '../color'
import type Square from '../../square/square'
import SquareID from '../../../components/square/square_id'
import PieceList from '../../../models/piece_list/piece_list'
import { GridPoint } from '../../../global_types/grid_point'
import { board_start_index, row_and_column_size } from '../../../utils/bounds'

export default class Pawn extends Piece implements Piece_Interface {
	private maximum_move_distance: number = 2
	private minimum_move_distance: number = 1

	en_passant_directions: PieceDirections[] = [PieceDirections.west, PieceDirections.east]
	attack_directions: PieceDirections[] = [PieceDirections.north_east, PieceDirections.north_west, ...this.en_passant_directions]

	//Global Properties
	//Initial move distance
	public move_distance: number = this.maximum_move_distance
	public last_position: string = this.pos
	public en_passant_moves: string[] = []

	constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
		super(title, type, pos, svg, color)
		this.type = type

		this.directions = [PieceDirections.north]
	}

	public build_possible_attack_list(): void {
		this.attack_directions.forEach((direction) => {
			const next_row: number =
				SquareGrid.point_at_board_position(this.pos).row +
				piece_direction_modifier(direction).row
			const next_col: number =
				SquareGrid.point_at_board_position(this.pos).col +
				piece_direction_modifier(direction).col

			const piece_at_attack_point: Piece | undefined = SquareGrid.piece_by_grid_point({
				row: next_row,
				col: next_col,
			})

			if (
				this.conditions_for_adding_attack_square(piece_at_attack_point, next_row, next_col)
			) {
				if(!this.en_passant_directions.includes(direction)) {
					this.possible_moves.push(SquareID.pos_at_point({ row: next_row, col: next_col }))
				} else {
					if(this.conditions_for_en_passant(piece_at_attack_point!)) {
						if(!this.en_passant_moves.includes(SquareID.pos_at_point({ row: next_row-1, col: next_col }))) {
							this.en_passant_moves.push(SquareID.pos_at_point({ row: next_row-1, col: next_col }))
						}
					}
				}
			}
		})
		if(!this.possible_moves.includes(this.en_passant_moves[this.en_passant_moves.length-1])) {
			this.possible_moves.push(this.en_passant_moves[this.en_passant_moves.length-1])
		}
	}

	private conditions_for_adding_attack_square(
		piece_at_attack_point: Piece | undefined,
		next_row: number,
		next_col: number,
	): boolean {
		let should_attack: boolean = true

		if (piece_at_attack_point !== undefined) {
			if (piece_at_attack_point.color === this.color) {
				should_attack = false
			}

			if (Piece.position_restrictions.length > 0) {
				if (
					!Piece.position_restrictions.includes(
						SquareID.pos_at_point({ row: next_row, col: next_col }),
					)
				) {
					should_attack = false
				}
			}
		} else {
			should_attack = false
		}

		return should_attack
	}

	private conditions_for_en_passant(piece_at_attack_point: Piece): boolean {
		if(piece_at_attack_point.type === PieceType.pawn) {
			const pawn = piece_at_attack_point as Pawn
			const last_pawn_gp: GridPoint = SquareGrid.point_at_board_position(pawn.last_position)
			const pawn_gp: GridPoint = SquareGrid.point_at_board_position(pawn.pos)
			if(last_pawn_gp.row === pawn_gp.row - this.maximum_move_distance) {
				return true
			}
		}
		return false
	}

	public move_to(new_square: Square): Promise<void> {
		return new Promise(async (resolve) => {

			if(this.en_passant_moves[this.en_passant_moves.length-1] === new_square.square_id) {
				const move_point: GridPoint = SquareGrid.point_at_board_position(this.en_passant_moves[this.en_passant_moves.length-1])
				const piece_pos: string = SquareID.pos_at_point({row: move_point.row+1, col:move_point.col})
				PieceList.remove_piece_by_position(piece_pos)
			}

			this.last_position = this.pos
			this.pos = new_square.square_id as string
			this.move_distance = this.minimum_move_distance
			this.possible_moves = []

			if (new_square.grid_point.row === row_and_column_size-1 || new_square.grid_point.row === board_start_index) {
				this.make_queen()
			}

			resolve()
		})
	}

	public make_queen() {
		PieceList.swap_with_queen(this.title, this.pos, this.color)
	}
}
