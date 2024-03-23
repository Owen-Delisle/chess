import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { BlackOrWhite } from "../../../global_types/enums/black_or_white"
import { RookType } from "../../../components/piece/pieces/rook"
import { SubjectResultBoard } from "../../../tests/types"
import Piece from "../../../components/piece/piece"

const castle_boards: SubjectResultBoard[] = [
    should_short_castle(),
    should_long_castle(),
    piece_blocking_short_castle(),
    piece_blocking_long_castle(),
    piece_attacking_short_castle(),
    piece_attacking_long_castle()
]

function should_short_castle(): SubjectResultBoard {
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'H1', PieceType.rook, BlackOrWhite.white, RookType.short_rook)

    return {
        title: 'Should Short Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: true
    }
}

function should_long_castle(): SubjectResultBoard {
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'A1', PieceType.rook, BlackOrWhite.white, RookType.long_rook)

    return {
        title: 'Should Short Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: true
    }
}

function piece_blocking_short_castle(): SubjectResultBoard {
    const bishop: Piece = piece_factory('bishop_w', 'F1', PieceType.bishop, BlackOrWhite.white)
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'H1', PieceType.rook, BlackOrWhite.white, RookType.short_rook)

    return {
        title: 'Piece Blocking Short Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            bishop,
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: true
    }
}

function piece_blocking_long_castle(): SubjectResultBoard {
    const bishop: Piece = piece_factory('bishop_w', 'C1', PieceType.bishop, BlackOrWhite.white)
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'A1', PieceType.rook, BlackOrWhite.white, RookType.long_rook)

    return {
        title: 'Piece Blocking Long Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            bishop,
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: true
    }
}

function piece_attacking_short_castle(): SubjectResultBoard {
    const attacking_rook: Piece = piece_factory('rook_w', 'G2', PieceType.rook, BlackOrWhite.black, RookType.short_rook)
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'H1', PieceType.rook, BlackOrWhite.white, RookType.short_rook)

    return {
        title: 'Piece Attacking Short Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            attacking_rook,
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: false
    }
}

function piece_attacking_long_castle(): SubjectResultBoard {
    const attacking_rook: Piece = piece_factory('rook_w', 'C2', PieceType.rook, BlackOrWhite.black, RookType.short_rook)
    const king: Piece = piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white)
    const rook: Piece = piece_factory('rook_w1', 'A1', PieceType.rook, BlackOrWhite.white, RookType.long_rook)

    return {
        title: 'Piece Attacking Long Castle', 
        board: [
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
            attacking_rook,
            king,
            rook,
        ],
        subject: [king, rook],
        expected_result: false
    }
}


export default castle_boards