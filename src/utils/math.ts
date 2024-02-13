import SquareGrid from '../models/square_grid'
import SquareID from '../components/square/square_id'
import type { GridPoint } from '../global_types/grid_point'
import { are_coors_within_board_bounds } from './bounds'
import { knight_direction_modifiers } from '../components/piece/piece_directions'

export function distance_between_aligned_points(point_one: GridPoint, point_two: GridPoint): number {
	[point_one, point_two].forEach((point) => {
		if (!are_coors_within_board_bounds(point.row, point.col)) {
			throw new Error(`${point.row}, ${point.col} is out of bounds.`)
		}
	})

	//TODO -- HANDLE KNIGHT DIRECTIONS

	const x1 = point_one.row
	const x2 = point_two.row

	const y1 = point_one.col
	const y2 = point_two.col

	// Check if the points are aligned horizontally, vertically, or diagonally
	if (x1 === x2 || y1 === y2 || Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
		// Check if indices are within the valid range
		// Calculate the number of squares between the points
		const dx = Math.abs(x2 - x1);
		const dy = Math.abs(y2 - y1);
		const maxDistance = Math.max(dx, dy);
		return maxDistance
	} else {
		throw new Error("Points are not aligned vertically, horizontally or diagonally");
	}
}

export function distance_between_aligned_positions(pos_one: string, pos_two: string): number {
	;[pos_one, pos_two].forEach((pos) => {
		if (!SquareID.white_board_positions.includes(pos) || !SquareID.black_board_positions.includes(pos)) {
			throw new Error(`${pos}, does not exist on board`)
		}
	})

	const point_one: GridPoint = SquareGrid.point_at_board_position(pos_one)
	const point_two: GridPoint = SquareGrid.point_at_board_position(pos_two)

	return distance_between_aligned_points(point_one, point_two)
}

export function is_within_one_knight_move(from: GridPoint, to: GridPoint) {
	let one_move: boolean = false

	knight_direction_modifiers().forEach(modifier => {
		const next_gp: GridPoint = { row: from.row + modifier.row, col: from.col + modifier.col }
		if (next_gp.row == to.row && next_gp.col === to.col) {
			one_move = true
		}
	});

	return one_move
}
