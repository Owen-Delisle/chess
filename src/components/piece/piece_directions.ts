import type { GridPoint } from '../../global_types/grid_point'

export enum PieceDirections {
	north,
	north_east,
	east,
	south_east,
	south,
	south_west,
	west,
	north_west,
	up_right,
	right_up,
	right_down,
	down_right,
	down_left,
	left_down,
	left_up,
	up_left,
}

export function piece_direction_modifier(
	direction: PieceDirections,
): GridPoint {
	switch (direction) {
		case PieceDirections.north:
			return { row: -1, col: 0 }
		case PieceDirections.north_east:
			return { row: -1, col: 1 }
		case PieceDirections.east:
			return { row: 0, col: 1 }
		case PieceDirections.south_east:
			return { row: 1, col: 1 }
		case PieceDirections.south:
			return { row: 1, col: 0 }
		case PieceDirections.south_west:
			return { row: 1, col: -1 }
		case PieceDirections.west:
			return { row: 0, col: -1 }
		case PieceDirections.north_west:
			return { row: -1, col: -1 }
		case PieceDirections.up_right:
			return { row: -2, col: 1 }
		case PieceDirections.right_up:
			return { row: -1, col: 2 }
		case PieceDirections.right_down:
			return { row: 1, col: 2 }
		case PieceDirections.down_right:
			return { row: 2, col: 1 }
		case PieceDirections.down_left:
			return { row: 2, col: -1 }
		case PieceDirections.left_down:
			return { row: 1, col: -2 }
		case PieceDirections.left_up:
			return { row: -1, col: -2 }
		case PieceDirections.up_left:
			return { row: -2, col: -1 }
	}
}

export function direction_by_modifier(modifier: {
	row: number
	col: number
}): PieceDirections | undefined {
	if (modifier.row === -1 && modifier.col === 0) return PieceDirections.north
	if (modifier.row === -1 && modifier.col === 1)
		return PieceDirections.north_east
	if (modifier.row === 0 && modifier.col === 1) return PieceDirections.east
	if (modifier.row === 1 && modifier.col === 1)
		return PieceDirections.south_east
	if (modifier.row === 1 && modifier.col === 0) return PieceDirections.south
	if (modifier.row === 1 && modifier.col === -1)
		return PieceDirections.south_west
	if (modifier.row === 0 && modifier.col === -1) return PieceDirections.west
	if (modifier.row === -1 && modifier.col === -1)
		return PieceDirections.north_west
	if (modifier.row === -2 && modifier.col === 1)
		return PieceDirections.up_right
	if (modifier.row === -1 && modifier.col === 2)
		return PieceDirections.right_up
	if (modifier.row === 1 && modifier.col === 2)
		return PieceDirections.right_down
	if (modifier.row === 2 && modifier.col === 1)
		return PieceDirections.down_right
	if (modifier.row === 2 && modifier.col === -1)
		return PieceDirections.down_left
	if (modifier.row === 1 && modifier.col === -2)
		return PieceDirections.left_down
	if (modifier.row === -1 && modifier.col === -2)
		return PieceDirections.left_up
	if (modifier.row === -2 && modifier.col === -1)
		return PieceDirections.up_left
}

export function every_direction(): number[] {
	return Object.keys(PieceDirections)
		.filter((key) => !isNaN(parseInt(key, 10)))
		.map((key) => parseInt(key, 10))
}
