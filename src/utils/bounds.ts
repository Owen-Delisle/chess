export const board_start_index = 0
export const row_and_column_size = 8

export function are_coors_within_board_bounds(row: number, col: number): boolean {
	if (isNaN(row)) {
		throw new Error('row input is NaN')
	}
	if (isNaN(col)) {
		throw new Error('col input is NaN')
	}

	if (row < board_start_index) return false
	if (row >= row_and_column_size) return false

	if (col < board_start_index) return false
	if (col >= row_and_column_size) return false

	return true
}
