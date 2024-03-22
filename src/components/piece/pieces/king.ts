import type { GridPoint } from '../../../global_types/grid_point'
import { BlackOrWhite, not_color } from '../../../global_types/enums/black_or_white'
import Piece from '../piece'
import {
	PieceDirections,
	piece_direction_modifier,
	direction_by_modifier,
	index_of_knight_directions
} from '../piece_directions'
import type Piece_Interface from '../piece_interface'
import { PieceType } from '../piece_types'
import SquareGrid from '../../../models/square_grid'
import type Rook from './rook'
import { RookType } from './rook'
import SquareID from '../../../components/square/square_id'
import { are_coors_within_board_bounds } from '../../../utils/bounds'
import { distance_between_aligned_points, is_within_one_knight_move } from '../../../utils/math'
import are_equal from '../../../utils/types'
import { surrounding_points } from '../../../utils/grid'
import { every_direction } from '../piece_directions'
import Pawn from './pawn'
import { GameEndType } from '../../../controllers/game_controller'
import { WinOrLose } from '../../../controllers/game_controller'

import King_W_Win_SVG from '../piece_factory/assets/king-w-win.svg'
import King_B_Win_SVG from '../piece_factory/assets/king-b-win.svg'
import King_W_Loss_SVG from '../piece_factory/assets/king-w-loss.svg'
import King_B_Loss_SVG from '../piece_factory/assets/king-b-loss.svg'
import PieceList from '../../../models/piece_list'

export default class King extends Piece implements Piece_Interface {
	move_distance: number = 1
	piece_value: number = 0

	directions: PieceDirections[]
	has_moved: boolean = false
	in_check: boolean = false
	positions_to_be_blocked: string[] = []

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

	private moveable_positions_surrounding_king(square_grid: SquareGrid): string[] {
		const list_of_positions: string[] = this.points_surrounding_king(square_grid)
			.filter((point) => {
				const piece: Piece | undefined = square_grid.piece_by_grid_point(point)
				if (piece === undefined) {
					return true
				}
				if (!this.check_if_piece_is_covered_in_any_direction(square_grid, piece)) {
					this.possible_moves.push(piece.pos)
					return true
				}
			})
			.map((point) => SquareID.pos_at_point(point))
		return list_of_positions
	}

	private points_surrounding_king(square_grid: SquareGrid): GridPoint[] {
		return surrounding_points(square_grid.point_at_board_position(this.pos))
	}

	public check_for_checkmate(piece_list: PieceList): GameEndType | undefined {
		if (!this.any_piece_can_move(piece_list)) {
			if(this.in_check) {
				return GameEndType.checkmate
			} else {
				return GameEndType.stalemate
			}
		}
	}

	public any_piece_can_move(piece_list: PieceList): boolean {
		const any_piece_has_move: boolean = piece_list.pieces_by_color(this.color).some(
			(piece) => piece.possible_moves.length > 0,
		)

		return any_piece_has_move
	}

	public render_legal_squares_surrounding_king(square_grid: SquareGrid, piece_list: PieceList): void {
		const positions_surrounding_king = this.moveable_positions_surrounding_king(square_grid)
		const attacked_points_around_king = this.attacked_points_around_king(square_grid, piece_list)
		if (are_equal(positions_surrounding_king, attacked_points_around_king)) {
			this.move_distance = 0
		} else {
			this.move_distance = 1
			this.position_restrictions = positions_surrounding_king.filter(
				(position) => !attacked_points_around_king.includes(position),
			)
		}
	}

	public attacked_points_around_king(square_grid: SquareGrid, piece_list: PieceList): string[] {
		let attacked_positions: string[] = []

		this.points_surrounding_king(square_grid).forEach((point) => {
			every_direction().forEach((direction) => {
				const row_modifier: number = piece_direction_modifier(direction).row
				const col_modifier: number = piece_direction_modifier(direction).col

				const initial_row = point.row
				const initial_col = point.col

				const next_row = initial_row + row_modifier
				const next_col = initial_col + col_modifier

				if (
					this.check_if_square_is_covered_by_piece_of_color(
						square_grid,
						initial_row,
						initial_col,
						next_row,
						next_col,
						row_modifier,
						col_modifier,
						direction,
						1,
						not_color(this.color),
					)
				) {
					const next_pos: string = SquareID.pos_at_point({
						row: initial_row,
						col: initial_col,
					})
					if (!attacked_positions.includes(next_pos)) {
						if (piece_list.piece_by_position(next_pos) === undefined) {
							attacked_positions.push(next_pos)
						}
					}
				}
			})
		})
		return attacked_positions
	}

	private check_if_piece_is_covered_in_any_direction(square_grid: SquareGrid, piece: Piece): boolean {
		return every_direction().some((direction) => {
			const gp: GridPoint = square_grid.point_at_board_position(piece.pos)
			const starting_row: number = gp.row
			const starting_col: number = gp.col
			const next_row: number = gp.row + piece_direction_modifier(direction).row
			const next_col: number = gp.col + piece_direction_modifier(direction).col
			const row_modifier: number = piece_direction_modifier(direction).row
			const col_modifier: number = piece_direction_modifier(direction).col

			return this.check_if_square_is_covered_by_piece_of_color(
				square_grid,
				starting_row,
				starting_col,
				next_row,
				next_col,
				row_modifier,
				col_modifier,
				direction,
				1,
				piece.color,
			)
		})
	}

	private check_if_square_is_covered_by_piece_of_color(
		square_grid: SquareGrid,
		starting_row: number,
		starting_col: number,
		next_row: number,
		next_col: number,
		row_modifier: number,
		col_modifier: number,
		direction: PieceDirections,
		distance: number,
		color: BlackOrWhite,
	): boolean {
		// If all squares in direction have been searched and no piece of other color that can attack king in this direction have been found
		if (!are_coors_within_board_bounds(next_row, next_col)) {
			return false
		}

		//If square is in bound
		const piece: Piece | undefined = square_grid.piece_by_grid_point({
			row: next_row,
			col: next_col,
		})

		// If Square has piece and piece is NOT the same color as the piece
		if (piece !== undefined && piece.color !== color && piece !== this) {
			return false
		}

		// If Square has piece and piece IS the same color as the piece
		if (piece !== undefined && piece.color === color) {
			//If piece could attack king
			let direction: PieceDirections | undefined = direction_by_modifier({
				row: row_modifier,
				col: col_modifier,
			})
			if (direction !== undefined) {
				if(piece.type !== PieceType.pawn) {
					if (piece.directions.includes(direction)) {
						if (piece.move_distance >= distance) {
							return true
						}
						return false
					}
				} else {
					return this.pawn_attack_square(piece, direction, distance)
				}
			}
		}

		// If square is empty
		if (piece === undefined || piece === this) {
			next_row = next_row + row_modifier
			next_col = next_col + col_modifier
			return this.check_if_square_is_covered_by_piece_of_color(
				square_grid,
				starting_row,
				starting_col,
				next_row,
				next_col,
				row_modifier,
				col_modifier,
				direction,
				++distance,
				color,
			)
		}

		return false
	}

	private pawn_attack_square(
		piece: Piece,
		direction: PieceDirections,
		distance: number,
	): boolean {
		const pawn: Pawn = piece as Pawn
		if (distance <= pawn.attack_distance) {
			if(pawn.attack_directions.includes(direction)) {
				return true
			}
		}
		return false
	}

	public render_check_paths_list(square_grid: SquareGrid): void {
		if(this.in_check) {
			this.king_out_of_check(square_grid)
		}

		const check_paths_list: {
			direction: PieceDirections
			ordered_pieces_list: Piece[]
		}[] = this.check_path_lists_from_every_direction(square_grid)
		check_paths_list.forEach((path) => {
			this.render_path(square_grid, path)
		})
	}

	private render_path(square_grid: SquareGrid, path: { direction: PieceDirections; ordered_pieces_list: Piece[] }): void {
		const pieces: Piece[] = path.ordered_pieces_list

		if (pieces.length < 1) {
			return
		}

		const first_piece = pieces[0]
		const first_piece_gp = square_grid.point_at_board_position(first_piece.pos)

		//Blocking Check
		if (first_piece.color === this.color) {
			if (pieces.length > 1) {
				if (this.piece_in_path_conditions(square_grid, pieces[1], path.direction)) {
					first_piece.position_restrictions = SquareID.pos_between_points(
						square_grid.point_at_board_position(this.pos),
						square_grid.point_at_board_position(pieces[1].pos),
					)
				}
			}
		}

		// In Check
		if (this.piece_in_path_conditions(square_grid, first_piece, path.direction)) {
			this.king_in_check(square_grid)
			if (path.direction < index_of_knight_directions) {
				Piece.update_global_movement_restrictions([
					...SquareID.pos_between_points(
						square_grid.point_at_board_position(this.pos),
						first_piece_gp,
					),
				])
			} else {
				const attacking_knight_position: string = SquareID.pos_at_point(first_piece_gp)
				Piece.update_global_movement_restrictions([attacking_knight_position])
			}
		}
	}

	private king_in_check(square_grid: SquareGrid): void {
		this.in_check = true
		square_grid.square_by_board_position(this.pos)?.add_check_border()
	}

	private king_out_of_check(square_grid: SquareGrid): void {
		this.in_check = false
		square_grid.square_by_board_position(this.pos)?.remove_check_border()
	}

	// Refactor
	private piece_in_path_conditions(square_grid: SquareGrid, piece: Piece, direction: PieceDirections): boolean {
		try {
			const king_gp: GridPoint = square_grid.point_at_board_position(this.pos)
			const piece_gp: GridPoint = square_grid.point_at_board_position(piece.pos)
			let piece_is_within_distance: boolean = false
			
			if(direction < index_of_knight_directions) {
				if(piece.move_distance >= distance_between_aligned_points(piece_gp, king_gp)) {
					piece_is_within_distance = true
				}
			} else {
				if(is_within_one_knight_move(king_gp, piece_gp)) {
					piece_is_within_distance = true
				} else {
					piece_is_within_distance = false
				}
			}
			
			if (piece.color === not_color(this.color)) {
				if(piece.type !== PieceType.pawn) {
					if (piece.directions.includes(direction)) {
						if (piece_is_within_distance) {
							return true
						}
					}
				} else {
					const pawn: Pawn = piece as Pawn
					if(pawn.attack_directions.includes(direction)) {
						if(piece_is_within_distance) {
							return true
						}
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
		return false
	}

	private check_path_lists_from_every_direction(square_grid: SquareGrid): {
		direction: PieceDirections
		ordered_pieces_list: Piece[]
	}[] {
		let check_path_lists: {
			direction: PieceDirections
			ordered_pieces_list: Piece[]
		}[] = []
		every_direction().forEach((direction) => {
			check_path_lists.push({
				direction: direction,
				ordered_pieces_list: this.list_of_pieces_in_direction(square_grid, direction),
			})
		})
		return check_path_lists
	}

	private list_of_pieces_in_direction(square_grid: SquareGrid, direction: PieceDirections): Piece[] {
		const starting_point: GridPoint = square_grid.point_at_board_position(this.pos)
		let current_row: number = starting_point.row
		let current_col: number = starting_point.col
		let pieces_in_path: Piece[] = []
		let modifier: { row: number; col: number } = piece_direction_modifier(direction)

		while (
			are_coors_within_board_bounds(current_row + modifier.row, current_col + modifier.col)
		) {
			current_row = current_row + modifier.row
			current_col = current_col + modifier.col

			let piece_at_position = square_grid.piece_by_grid_point({
				row: current_row,
				col: current_col,
			})
			if (piece_at_position != undefined) {
				pieces_in_path.push(piece_at_position)
			}
		}

		return pieces_in_path
	}

	public move_to(new_pos: string): Promise<void> {
		return new Promise(async (resolve) => {
			this.pos = new_pos
			this.has_moved = true
			this.possible_moves = []
			resolve()
		})
	}

	public rooks_for_king(piece_list: PieceList): Rook[] {
		const pieces = piece_list.list.filter(
			(rook) => rook.type === PieceType.rook && rook.color === this.color,
		)

		const rooks: Rook[] = pieces as Rook[]

		return rooks
	}

	public add_borders_to_castleable_rooks(square_grid: SquareGrid, piece_list: PieceList, rooks: Piece[]) {
		rooks.forEach((piece) => {
			const rook = piece as Rook
			const rook_gp: GridPoint = square_grid.point_at_board_position(rook.pos)
			if (
				this.squares_between_king_and_rook_empty(square_grid, piece_list, rook) &&
				!this.has_moved &&
				!rook.has_moved &&
				!this.in_check &&
				!this.kings_castle_squares_attacked(square_grid, piece_list, rook)
			) {
				square_grid.square_by_grid_point({
					row: rook_gp.row,
					col: rook_gp.col,
				}).add_border()
			}
		})
	}

	public squares_between_king_and_rook_empty(square_grid: SquareGrid, piece_list: PieceList, rook: Rook): boolean {
		const castle_vars = this.castle_vars_for_rook_type(rook.rook_type)
		const rook_gp: GridPoint = square_grid.point_at_board_position(rook.pos)

		const square_beside_king: GridPoint = {
			row: square_grid.point_at_board_position(this.pos).row,
			col: square_grid.point_at_board_position(this.pos).col + castle_vars.index_modifier,
		}
		const square_beside_rook: GridPoint = {
			row: rook_gp.row,
			col: rook_gp.col - castle_vars.index_modifier,
		}

		let positions_between_king_and_rook = SquareID.pos_between_points(
			square_beside_king,
			square_beside_rook,
		)

		const any_pieces = positions_between_king_and_rook.some(
			(position) => piece_list.piece_by_position(position) !== undefined,
		)
		return !any_pieces
	}

	public kings_castle_squares_attacked(square_grid: SquareGrid, piece_list: PieceList, rook: Rook): boolean {
		const castle_vars = this.castle_vars_for_rook_type(rook.rook_type)

		const first_point: GridPoint = {
			row: square_grid.point_at_board_position(this.pos).row,
			col: square_grid.point_at_board_position(this.pos).col + castle_vars.index_modifier,
		}
		const second_point: GridPoint = {
			row: first_point.row,
			col: first_point!.col + castle_vars.index_modifier,
		}

		const first_position = SquareID.pos_at_point(first_point)
		const second_position = SquareID.pos_at_point(second_point)

		const any_piece = piece_list.pieces_by_other_color(this.color).some((piece) =>
			piece.possible_moves.some((move) => [first_position, second_position].includes(move)),
		)

		return any_piece
	}

	public castle_vars_for_rook_type(rook_type: RookType): CastleVars {
		if (this.color == BlackOrWhite.white) {
			switch (rook_type) {
				case RookType.long_rook:
					return {
						king_col_modifier: -2,
						rook_col_modifier: 3,
						number_of_squares_between_king_and_rook: 3,
						index_modifier: -1,
					}
				case RookType.short_rook:
					return {
						king_col_modifier: 2,
						rook_col_modifier: -2,
						number_of_squares_between_king_and_rook: 2,
						index_modifier: 1,
					}
			}
		} else {
			switch (rook_type) {
				case RookType.long_rook:
					return {
						king_col_modifier: 2,
						rook_col_modifier: -3,
						number_of_squares_between_king_and_rook: 3,
						index_modifier: 1,
					}
				case RookType.short_rook:
					return {
						king_col_modifier: -2,
						rook_col_modifier: 2,
						number_of_squares_between_king_and_rook: 2,
						index_modifier: -1,
					}
			}
		}
	}

	public switch_image_with_endgame_image(square_grid: SquareGrid, game_end_type: GameEndType, win_or_lose: WinOrLose): void {
		if(game_end_type === GameEndType.checkmate) {
			switch (this.color) {
				case BlackOrWhite.black:
					this.svg = win_or_lose === WinOrLose.win ? King_B_Win_SVG: King_B_Loss_SVG
					break
				case BlackOrWhite.white:
					this.svg = win_or_lose === WinOrLose.win ? King_W_Win_SVG : King_W_Loss_SVG
					break
			}
		} else {
			this.svg = King_B_Loss_SVG
			this.svg = King_W_Loss_SVG
		}

		const square = square_grid.square_by_board_position(this.pos)
		if(square !== undefined) {
			square.update_image(this.image_builder())
		}
	}
}

export type CastleVars = {
	king_col_modifier: number
	rook_col_modifier: number
	number_of_squares_between_king_and_rook: number
	index_modifier: number
}
