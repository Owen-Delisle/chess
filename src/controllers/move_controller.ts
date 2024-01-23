import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type Pawn from "../components/piece/pieces/pawn"
import {PieceType} from "../components/piece/piece_types"

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
            let possible_moves: any = piece.calculate_possible_moves()
            console.log(possible_moves)
        }
    }
}
