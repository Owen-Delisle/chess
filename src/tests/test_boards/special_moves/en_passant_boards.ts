import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { BlackOrWhite } from "../../../global_types/enums/black_or_white"
import { SubjectResultBoard } from "../../../tests/types"
import Piece from "../../../components/piece/piece"
import { Move } from "../../../global_types/move"

const en_passant_boards: SubjectResultBoard[] = [
    should_en_passant(),
    pawn_moved_one_square(),
    pawn_wasnt_last_move()
]

function should_en_passant(): SubjectResultBoard {
    const black_pawn: Piece = piece_factory('pawn_b', 'D5', PieceType.pawn, BlackOrWhite.black)
    const white_pawn: Piece = piece_factory('pawn_w', 'E5', PieceType.pawn, BlackOrWhite.white)

    const move: Move = {piece: black_pawn, from: 'D7', to: 'D5'}

    return {
        title: 'Should En Passant', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),
            white_pawn,
        ],
        subject: {white_pawn, black_pawn, move},
        expected_result: true
    }
}

function pawn_moved_one_square(): SubjectResultBoard {
    const black_pawn: Piece = piece_factory('pawn_b', 'D5', PieceType.pawn, BlackOrWhite.black)
    const white_pawn: Piece = piece_factory('pawn_w', 'E5', PieceType.pawn, BlackOrWhite.white)

    const move: Move = {piece: black_pawn, from: 'D6', to: 'D5'}

    return {
        title: 'Should Not En Passant 1', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),
            white_pawn,
        ],
        subject: {white_pawn, black_pawn, move},
        expected_result: false
    }
}

function pawn_wasnt_last_move(): SubjectResultBoard {
    const black_pawn: Piece = piece_factory('pawn_b', 'D5', PieceType.pawn, BlackOrWhite.black)
    const white_pawn: Piece = piece_factory('pawn_w', 'E5', PieceType.pawn, BlackOrWhite.white)
    const rando_pawn: Piece = piece_factory('pawn_w1', 'A5', PieceType.pawn, BlackOrWhite.white)

    const move: Move = {piece: rando_pawn, from: 'A5', to: 'A7'}

    return {
        title: 'Should Not En Passant 2', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),
            white_pawn,
        ],
        subject: {white_pawn, black_pawn, move},
        expected_result: false
    }
}

export default en_passant_boards