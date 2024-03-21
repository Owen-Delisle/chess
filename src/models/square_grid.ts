import type Square from '../components/square/square'
import type { GridPoint } from '../global_types/grid_point'
import type Piece from '../components/piece/piece'
import { are_coors_within_board_bounds } from '../utils/bounds'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import PlayerController from '../controllers/player_controller'

export default class SquareGrid {
	grid: Array<Array<Square>>

	constructor() {
		this.grid = []
	}

	public point_by_piece(piece: Piece): GridPoint | undefined {
		let piece_id: string = piece.title
		let coors: GridPoint | undefined = undefined
		for (let row_index = 0; row_index < this.grid.length; row_index++) {
			for (let col_index = 0; col_index < this.grid[0].length; col_index++) {
				if (this.piece_title_at_point(row_index, col_index) == piece_id) {
					coors = { row: row_index, col: col_index }
				}
			}
		}
		return coors
	}

	private piece_title_at_point(row: number, col: number): string {
		if (this.grid[row][col].piece_attached_to_square() !== undefined) {
			return this.grid[row][col].piece_attached_to_square()!.title
		} else {
			return ''
		}
	}

	public square_by_grid_point(point: GridPoint): Square {
		return this.grid[point.row][point.col]
	}

	public square_by_board_position(id: string): Square | undefined {
		let square: Square | undefined = undefined
		for (let row_index = 0; row_index < this.grid.length; row_index++) {
			for (let col_index = 0; col_index < this.grid[0].length; col_index++) {
				if (this.grid[row_index][col_index].square_id == id) {
					square = this.grid[row_index][col_index]
				}
			}
		}
		return square
	}

	public piece_by_grid_point(point: GridPoint): Piece | undefined {
		if (!are_coors_within_board_bounds(point.row, point.col)) {
			return undefined
		}
		return this.grid[point.row][point.col].piece_attached_to_square()
	}

	public point_at_board_position(s: string): GridPoint {
		const color: BlackOrWhite = PlayerController.player_color
		if (color === BlackOrWhite.white) {
			return {
				row: 8 - parseInt(`${s[1]}`),
				col: s[0].charCodeAt(0) - 65,
			}
		} else {
			return {
				row: parseInt(`${s[1]}`) - 1,
				col: 72 - s[0].charCodeAt(0),
			}
		}
	}
}
