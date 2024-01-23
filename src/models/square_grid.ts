import type Square from "../components/square/square"
import type { GridPoint } from "../global_types/grid_point"
import type Piece from "../components/piece/piece"

export default class SquareGrid {
    public static square_grid: Array<Array<Square>> = []

    public static point_by_piece_id(piece_id: string): GridPoint | undefined{
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

    public static square_by_grid_point(point: GridPoint): Square{
        return this.square_grid[point.row][point.col]
    }

    public static piece_by_grid_point(point: GridPoint): Piece | undefined {
        return SquareGrid.square_grid[point.row][point.col].piece
    }
}