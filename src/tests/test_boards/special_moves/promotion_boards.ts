import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import { SubjectResultBoard } from "../../../tests/types"
import Piece from "../../../components/piece/piece"

const promotion_boards: SubjectResultBoard[] = [
    should_promote(),
    should_not_promote(),
]

function should_promote(): SubjectResultBoard {
    const pawn: Piece = piece_factory('pawn_w', 'A8', PieceType.pawn, Color.white)

    return {
        title: 'Should Promote', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            pawn,
        ],
        subject: pawn,
        expected_result: true
    }
}

function should_not_promote(): SubjectResultBoard {
    const pawn: Piece = piece_factory('pawn_w', 'A7', PieceType.pawn, Color.white)

    return {
        title: 'Should Promote', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            pawn,
        ],
        subject: pawn,
        expected_result: false
    }
}

export default promotion_boards