export const start_index = 0
export const row_and_column_size = 8

export function are_coors_within_board_bounds(row: number, col: number): boolean {
    if (row < start_index) return false
    if (row >= row_and_column_size) return false

    if (col < start_index) return false
    if (col >= row_and_column_size) return false

    return true
}

// next_row < 0 || next_row >= Board.row_size || next_col < 0 || next_col >= Board.row_size