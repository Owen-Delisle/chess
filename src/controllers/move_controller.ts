import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"

export default class MoveController {
    static target_square: Square
    private static prev_square: Square

    static handle_square_click(square: Square) {
        if(this.target_square !== undefined) {
            this.target_square.remove_border()
        }

        if(square.piece !== undefined) {
            this.target_square = square
            square.add_border()
            
            let piece = Piece.piece_factory(square.piece)
            let possible_moves: GridPoint[]

            possible_moves = piece.calculate_possible_moves()
            if(possible_moves !== undefined) {
                possible_moves.forEach(coor => {
                    if(this.prev_square !== undefined) {
                        this.prev_square.remove_border()
                    }
                    let curr_square = SquareGrid.square_by_grid_point(coor)
                    curr_square.add_border()
                    this.prev_square = curr_square
                })
            }
        }
    }
}
