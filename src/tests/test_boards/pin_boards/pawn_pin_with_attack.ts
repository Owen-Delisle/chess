import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { BlackOrWhite } from "../../../global_types/enums/black_or_white"
import { RookType } from "../../../components/piece/pieces/rook"
import { SubjectResultBoard } from "../../../tests/types"
import Piece from "../../../components/piece/piece"

const pawn_pin_attack_boards: SubjectResultBoard[] = [
    pawn_pin_with_attack_from_west(),
]

function pawn_pin_with_attack_from_west(): SubjectResultBoard {
    const subject: Piece = piece_factory('pawn_w1', 'C2', PieceType.pawn, BlackOrWhite.white)
    return {
        title: 'Pawn Pin Attack', 
        board: [
            piece_factory('king_w', 'D2', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'C8', PieceType.king, BlackOrWhite.black),

            subject,

            piece_factory('rook_b1', 'D3', PieceType.rook, BlackOrWhite.black, RookType.short_rook),
            piece_factory('queen_b1', 'B2', PieceType.queen, BlackOrWhite.black),
        ],
        subject: subject,
        expected_result: []
    }
}

export default pawn_pin_attack_boards