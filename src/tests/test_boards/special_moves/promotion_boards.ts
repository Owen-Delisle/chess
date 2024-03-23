import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { BlackOrWhite } from "../../../global_types/enums/black_or_white"
import { SubjectResultBoard } from "../../../tests/types"
import Piece from "../../../components/piece/piece"

const promotion_boards: SubjectResultBoard[] = [
    should_promote(),
    should_not_promote(),
]

function should_promote(): SubjectResultBoard {
    const pawn: Piece = piece_factory('pawn_w', 'A8', PieceType.pawn, BlackOrWhite.white)

    return {
        title: 'Should Promote', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),
            pawn,
        ],
        subject: pawn,
        expected_result: true
    }
}

function should_not_promote(): SubjectResultBoard {
    const pawn: Piece = piece_factory('pawn_w', 'A7', PieceType.pawn, BlackOrWhite.white)

    return {
        title: 'Should Promote', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),
            pawn,
        ],
        subject: pawn,
        expected_result: false
    }
}

export default promotion_boards