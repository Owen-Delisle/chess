import type Square from "../components/square/square"

export default class SquareGrid {
    public static square_grid: Array<Array<Square>> = []

    public static position_by_piece_id(piece_id: string): [number, number] | undefined{
        let coors: [number, number] | undefined = undefined
        this.square_grid.forEach((row, row_index) => {
            for(let col_index = 0; col_index < row.length; col_index++) {
                if(this.square_id(row_index, col_index) == piece_id) {
                    coors = [row_index, col_index]
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