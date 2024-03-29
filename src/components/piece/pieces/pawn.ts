import Piece from '../piece'
import type Piece_Interface from '../piece_interface'
import { PieceType } from '../piece_types'
import SquareGrid from '../../../models/square_grid'
import { PieceDirections, piece_direction_modifier } from '../piece_directions'
import { BlackOrWhite } from '../../../global_types/enums/black_or_white'
import SquareID from '../../../components/square/square_id'
import { Move } from '../../../global_types/move'
import { distance_between_aligned_positions } from '../../../utils/math'

export default class Pawn extends Piece implements Piece_Interface {
	private maximum_move_distance: number = 2
	private minimum_move_distance: number = 1
	public attack_distance: number = 1

	private en_passant_directions: PieceDirections[] = [PieceDirections.west, PieceDirections.east]
	public attack_directions: PieceDirections[] = [PieceDirections.north_east, PieceDirections.north_west]
	private all_attack_directions: PieceDirections[] = [...this.attack_directions, ...this.en_passant_directions]

	public en_passant_position: string = ""

	//Global Properties
	//Initial move distance
	public move_distance: number = this.maximum_move_distance
	public piece_value: number = 1

	constructor(title: string, pos: string, svg: string, type: PieceType, color: BlackOrWhite) {
		super(title, type, pos, svg, color)
		this.type = type

		this.directions = [PieceDirections.north]
	}

	public build_possible_attack_list(square_grid: SquareGrid, last_move: Move | undefined): void {
		this.all_attack_directions.forEach((direction) => {
			const next_row: number =
				square_grid.point_at_board_position(this.pos).row +
				piece_direction_modifier(direction).row
			const next_col: number =
				square_grid.point_at_board_position(this.pos).col +
				piece_direction_modifier(direction).col

			const piece_at_attack_point: Piece | undefined = square_grid.piece_by_grid_point({
				row: next_row,
				col: next_col,
			})

			if (
				this.conditions_for_adding_attack_square(piece_at_attack_point, next_row, next_col)
			) {
				if(!this.en_passant_directions.includes(direction)) {
					this.possible_moves.push(SquareID.pos_at_point({ row: next_row, col: next_col }))
				} else {
					this.add_en_passant_move(square_grid, piece_at_attack_point, last_move)
				}
			}
		})
	}

	// Refactor
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

			if (Piece.position_restrictions.length > 0 || this.position_restrictions.length > 0) {
				const next_pos: string = SquareID.pos_at_point({ row: next_row, col: next_col })
				if (!this.any_restrictions_include_position(next_pos)) {
					should_attack = false
				}
			}
		} else {
			should_attack = false
		}

		return should_attack
	}

	private any_restrictions_include_position(position: string): boolean {
		if(Piece.position_restrictions.length > 0 && this.position_restrictions.length > 0) {
			return Piece.position_restrictions.includes(position) && this.position_restrictions.includes(position)
		}
		if(Piece.position_restrictions.length > 0) {
			return Piece.position_restrictions.includes(position)
		}

		if(this.position_restrictions.length > 0) {
			return this.position_restrictions.includes(position)
		}

		return false
	}

	private add_en_passant_move(square_grid: SquareGrid, piece_at_attack_point: Piece | undefined, last_move: Move | undefined): void {
		const piece_gp = square_grid.point_at_board_position(piece_at_attack_point!.pos)
		const next_row: number = piece_gp.row
		const next_col: number = piece_gp.col
		try {
			if(this.conditions_for_en_passant(square_grid, piece_at_attack_point, last_move)) {
				const en_passant_position = SquareID.pos_at_point({ row: next_row-1, col: next_col })
				this.possible_moves.push(en_passant_position)
				this.en_passant_position = en_passant_position
			}
		} catch(error) {
			console.log(error)
		}
	}

	public conditions_for_en_passant(square_grid: SquareGrid, piece_at_attack_point: Piece | undefined, last_move: Move | undefined): boolean {
		if(piece_at_attack_point === undefined) {
			return false
		}

		if(!last_move) {
			return false
		}

		if(piece_at_attack_point.type === PieceType.pawn) {
			if(last_move.piece.title === piece_at_attack_point.title) {
				if(distance_between_aligned_positions(square_grid, last_move.from, last_move.to) === this.maximum_move_distance) {
					return true
				}
			}
		}
		return false
	}

	public move_to(new_pos: string): Promise<void> {
		return new Promise(async (resolve) => {			
			this.pos = new_pos
			this.move_distance = this.minimum_move_distance
			this.possible_moves = []

			resolve()
		})
	}

	public should_en_passant(square_id: string): boolean {
		return square_id === this.en_passant_position
	}

	public en_passant(square_grid: SquareGrid) {
		const point = square_grid.point_at_board_position(this.en_passant_position)
		square_grid.square_by_grid_point({row: point.row+1, col: point.col}).remove_piece()
	}
}
