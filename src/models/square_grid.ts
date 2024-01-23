import type Square from "../components/square/square"
import type { GridPoint } from "../global_types/grid_point"

export default class SquareGrid {
    public static square_grid: Array<Array<Square>> = []

    public static position_by_piece_id(piece_id: string): GridPoint | undefined{
        let coors: GridPoint | undefined = undefined
        this.square_grid.forEach((row, row_index) => {
            for(let col_index = 0; col_index < row.length; col_index++) {
                if(this.square_id(row_index, col_index) == piece_id) {
                    coors = {row: row_index, col: col_index}
                }
            }
        })
        return coors
    }

    private static square_id(row: number, col: number): string {
        if(this.square_grid[row][col].piece !== undefined) {
            return this.square_grid[row][col].piece!.title
        } else {
            return ""
        }
    }

    public static square_id_by_coors(row: number, col: number): string {
        return this.square_grid[row][col].square_id as string
    }
}