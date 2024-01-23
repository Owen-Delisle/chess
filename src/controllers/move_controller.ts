import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"
import Index from "../index"

export default class MoveController {
    static target_square: Square
    private static prev_square: Square
    private static possible_moves: GridPoint[] = []

    static handle_square_click(square: Square) {
        if(this.target_square !== undefined) {
            this.target_square.remove_border()
            this.prev_square.remove_dot()
        }

        if(square.piece !== undefined) {
            this.target_square = square
            square.add_border()
            this.possible_moves = []
            
            let piece = Piece.piece_factory(square.piece)

            this.possible_moves = piece.calculate_possible_moves()
            console.log("poo", this.possible_moves)
            if(this.possible_moves !== undefined) {
                this.possible_moves.forEach(coor => {
                    if(this.prev_square !== undefined) {
                        this.prev_square.remove_dot()
                    }
                    let curr_square = SquareGrid.square_by_grid_point(coor)
                    curr_square.add_dot()
                    this.prev_square = curr_square
                })
            }
        } else if(square.piece === undefined && this.target_square !== undefined) {
            if(this.possible_moves.some(p => 
                p.row == square.grid_point.row && p.col == square.grid_point.col)) {
                    this.target_square.piece?.move(square.square_id as string)
                    Index.board.redraw()
                }
        }
    }
}
