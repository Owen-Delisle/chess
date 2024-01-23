import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"

export default class MoveController {
    static target_square: Square

    static handle_square_click(square: Square) {

        if(this.target_square !== undefined) {
            this.target_square.remove_border()
        }

        if(square.piece !== undefined) {
            this.target_square = square
            square.add_border()
            
            let piece = Piece.piece_factory(square.piece)
            let possible_moves: Array<[GridPoint]> | undefined

            possible_moves = piece.calculate_possible_moves()
            if(possible_moves !== undefined) {
                console.log(possible_moves)
            }
        }
    }
}
