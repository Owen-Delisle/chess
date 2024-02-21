import Piece from '../piece'
import type Piece_Interface from '../piece_interface'
import { PieceType } from '../piece_types'
import SquareGrid from '../../../models/square_grid'
import { PieceDirections, piece_direction_modifier } from '../piece_directions'
import { Color } from '../color'
import type Square from '../../square/square'
import SquareID from '../../../components/square/square_id'
import PieceList from '../../../models/piece_list'
import { board_start_index, row_and_column_size } from '../../../utils/bounds'
import { GameController } from '../../../controllers/game_controller'
import { Move } from '../../../global_types/move'
import { distance_between_aligned_positions } from '../../../utils/math'
import { GridPoint } from '../../../global_types/grid_point'

export default class Pawn extends Piece implements Piece_Interface {
	private maximum_move_distance: number = 2
	private minimum_move_distance: number = 1
	public attack_distance: number = 1

	private en_passant_directions: PieceDirections[] = [PieceDirections.west, PieceDirections.east]
	public attack_directions: PieceDirections[] = [PieceDirections.north_east, PieceDirections.north_west, ...this.en_passant_directions]

	private en_passant_position: string = ""

	//Global Properties
	//Initial move distance
	public move_distance: number = this.maximum_move_distance
	public piece_value: number = 1

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
					this.add_en_passant_move(piece_at_attack_point)
				}
			}
		})
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
		if(Piece.position_restrictions.length > 0) {
			return Piece.position_restrictions.includes(position)
		}

		if(this.position_restrictions.length > 0) {
			return this.position_restrictions.includes(position)
		}

		return false
	}

	private add_en_passant_move(piece_at_attack_point: Piece | undefined): void {
		const piece_gp = SquareGrid.point_at_board_position(piece_at_attack_point!.pos)
		const next_row: number = piece_gp.row
		const next_col: number = piece_gp.col
		try {
			if(this.conditions_for_en_passant(piece_at_attack_point)) {
				const en_passant_position = SquareID.pos_at_point({ row: next_row-1, col: next_col })
				this.possible_moves.push(en_passant_position)
				this.en_passant_position = en_passant_position
			}
		} catch(error) {
			console.log(error)
		}
	}

	//Public for testing
	public conditions_for_en_passant(piece_at_attack_point: Piece | undefined): boolean {
		if(piece_at_attack_point === undefined) {
			return false
		}

		if(GameController.move_list.last_move() === undefined) {
			throw(Error("Move list is empty and not functioning properly."))
		}

		const last_move: Move = GameController.move_list.last_move()!

		if(piece_at_attack_point.type === PieceType.pawn) {
			if(last_move.piece === piece_at_attack_point) {
				if(distance_between_aligned_positions(last_move.from, last_move.to) === this.maximum_move_distance) {
					return true
				}
			}
		}
		return false
	}

	public move_to(new_square: Square): Promise<void> {
		return new Promise(async (resolve) => {

			if(this.should_en_passant(new_square.square_id)) {
				this.en_passant()
			}
			
			this.pos = new_square.square_id
			this.move_distance = this.minimum_move_distance
			this.possible_moves = []

			const point: GridPoint = SquareGrid.point_at_board_position(new_square.square_id)
			if (this.should_make_queen(point.row)) {
				this.make_queen()
			}

			resolve()
		})
	}

	private make_queen() {
		PieceList.swap_with_queen(this.title, this.pos, this.color)
	}

	// Public for testing
	public should_make_queen(new_square_row: number): boolean {
		if(this.color === Color.white) {
			return new_square_row === board_start_index
		} else {
			return new_square_row === row_and_column_size-1
		}
	}

	private should_en_passant(square_id: string): boolean {
		return square_id === this.en_passant_position
	}

	private en_passant() {
		const point = SquareGrid.point_at_board_position(this.en_passant_position)
		PieceList.remove_piece_by_point({row: point.row+1, col: point.col})
	}
}
