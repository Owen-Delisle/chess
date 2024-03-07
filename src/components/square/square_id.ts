import { GameController } from '../../controllers/game_controller'
import type { GridPoint } from '../../global_types/grid_point'
import PlayerController from '../../server/controllers/player_controller'
import { Color } from '../piece/color'
import { BlackOrWhite } from './color'
import GameType from '../../global_types/enums/game_type'

export default class SquareID {
	// TODO -- Make One Board
	public static white_board_positions: string[] = [
		'A8',
		'B8',
		'C8',
		'D8',
		'E8',
		'F8',
		'G8',
		'H8',
		'A7',
		'B7',
		'C7',
		'D7',
		'E7',
		'F7',
		'G7',
		'H7',
		'A6',
		'B6',
		'C6',
		'D6',
		'E6',
		'F6',
		'G6',
		'H6',
		'A5',
		'B5',
		'C5',
		'D5',
		'E5',
		'F5',
		'G5',
		'H5',
		'A4',
		'B4',
		'C4',
		'D4',
		'E4',
		'F4',
		'G4',
		'H4',
		'A3',
		'B3',
		'C3',
		'D3',
		'E3',
		'F3',
		'G3',
		'H3',
		'A2',
		'B2',
		'C2',
		'D2',
		'E2',
		'F2',
		'G2',
		'H2',
		'A1',
		'B1',
		'C1',
		'D1',
		'E1',
		'F1',
		'G1',
		'H1',
	]

	public static black_board_positions: string[] = [
		'H1',
		'G1',
		'F1',
		'E1',
		'D1',
		'C1',
		'B1',
		'A1',
		'H2',
		'G2',
		'F2',
		'E2',
		'D2',
		'C2',
		'B2',
		'A2',
		'H3',
		'G3',
		'F3',
		'E3',
		'D3',
		'C3',
		'B3',
		'A3',
		'H4',
		'G4',
		'F4',
		'E4',
		'D4',
		'C4',
		'B4',
		'A4',
		'H5',
		'G5',
		'F5',
		'E5',
		'D5',
		'C5',
		'B5',
		'A5',
		'H6',
		'G6',
		'F6',
		'E6',
		'D6',
		'C6',
		'B6',
		'A6',
		'H7',
		'G7',
		'F7',
		'E7',
		'D7',
		'C7',
		'B7',
		'A7',
		'H8',
		'G8',
		'F8',
		'E8',
		'D8',
		'C8',
		'B8',
		'A8',
	]

	private static board_positions(): string[] {
		if(GameController.game_type === GameType.offline) {
			return GameController.turn === Color.white
			? SquareID.white_board_positions
			: SquareID.black_board_positions
		} else {
			return PlayerController.player_color === BlackOrWhite.white
			? SquareID.white_board_positions
			: SquareID.black_board_positions
		}
	}

	public static pos_at_index(index: number): string {
		return this.board_positions()[index]
	}

	public static point_at_index(index: number): GridPoint {
		let s: string = this.board_positions()[index]
		return {
			row: 8 - parseInt(`${s[1]}`),
			col: s[0].charCodeAt(0) - 65,
		}
	}

	public static pos_at_point(point: GridPoint): string {
		let index: number = point.row * 8 + point.col
		return this.board_positions()[index]
	}

	// TODO -- Make sure only sqaures aligned vertically, horizontally, or diagonally are calculated
	public static pos_between_points(point_one: GridPoint, point_two: GridPoint): string[] {
		const positions: string[] = []

		// Calculate the differences in x and y coordinates
		const delta_row = point_two.row - point_one.row
		const delta_col = point_two.col - point_one.col

		// Determine the number of points to interpolate
		const number_of_points = Math.max(Math.abs(delta_row), Math.abs(delta_col))

		// Calculate the step sizes for x and y coordinates
		const row_step = delta_row / number_of_points
		const col_step = delta_col / number_of_points

		// Generate the interpolated points
		for (let i = 0; i <= number_of_points; i++) {
			const interpolated_point: GridPoint = {
				row: point_one.row + i * row_step,
				col: point_one.col + i * col_step,
			}

			const interpolated_position: string = this.pos_at_point(interpolated_point)

			positions.push(interpolated_position)
		}

		return positions
	}
}
