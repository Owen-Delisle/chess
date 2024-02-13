import type { GridPoint } from '../global_types/grid_point'
import { are_coors_within_board_bounds } from './bounds'
import { PieceDirections, piece_direction_modifier } from '../components/piece/piece_directions'
import SquareGrid from '../models/square_grid'

export function square_is_empty(point: GridPoint): boolean {
	return SquareGrid.piece_by_grid_point(point)! === undefined
}

export function surrounding_points(grid_point: GridPoint): GridPoint[] {
	const surrounding_points: GridPoint[] = []

	// Define the offsets for neighboring points
	const offsets: GridPoint[] = [
		piece_direction_modifier(PieceDirections.north),
		piece_direction_modifier(PieceDirections.north_east),
		piece_direction_modifier(PieceDirections.east),
		piece_direction_modifier(PieceDirections.south_east),
		piece_direction_modifier(PieceDirections.south),
		piece_direction_modifier(PieceDirections.south_west),
		piece_direction_modifier(PieceDirections.west),
		piece_direction_modifier(PieceDirections.north_west),
	]

	// Iterate over all neighboring points
	for (const offset of offsets) {
		const neighbor_row = grid_point.row + offset.row
		const neighbor_col = grid_point.col + offset.col

		// Check if the neighboring point is within the grid bounds
		if (are_coors_within_board_bounds(neighbor_row, neighbor_col)) {
			surrounding_points.push({ row: neighbor_row, col: neighbor_col })
		}
	}

	return surrounding_points
}
