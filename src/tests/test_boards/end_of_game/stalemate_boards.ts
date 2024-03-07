import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { BlackOrWhite } from "../../../global_types/enums/black_or_white"
import { RookType } from "../../../components/piece/pieces/rook"
import CheckmateBoard from "../../types/check_mate_board"

const list_of_stalemates: CheckmateBoard[] = [
    stalemate_one(),
    stalemate_two(),
    stalemate_three(),
    anand_v_kramnik(),
    korchnoi_v_karpov(),
    bernstein_v_smyslov(),
    matulovic_v_minev()
]

function stalemate_one(): CheckmateBoard {
    return {
        title: 'Stalemate One', board: [
            piece_factory('king_w', 'C1', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'C3', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_b1', 'C2', PieceType.pawn, BlackOrWhite.black),
        ]
    }
}

function stalemate_two(): CheckmateBoard {
    return {
        title: 'Stalemate Two', board: [
            piece_factory('king_w', 'H1', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'G3', PieceType.king, BlackOrWhite.black),

            piece_factory('bishop_w1', 'G1', PieceType.bishop, BlackOrWhite.white),

            piece_factory('rook_b1', 'A1', PieceType.rook, BlackOrWhite.black, RookType.long_rook),
        ]
    }
}

function stalemate_three(): CheckmateBoard {
    return {
        title: 'Stalemate Three', board: [
            piece_factory('king_w', 'A1', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'G6', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, BlackOrWhite.white),

            piece_factory('queen_b1', 'B3', PieceType.queen, BlackOrWhite.black),

            piece_factory('rook_b1', 'A3', PieceType.rook, BlackOrWhite.black, RookType.long_rook),
        ]
    }
}

function anand_v_kramnik(): CheckmateBoard {
    return {
        title: 'Anand VS Kramnik 2007', board: [
            piece_factory('king_w', 'H5', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'F5', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_w1', 'H4', PieceType.pawn, BlackOrWhite.white),

            piece_factory('pawn_b1', 'F6', PieceType.pawn, BlackOrWhite.black),
            piece_factory('pawn_b2', 'G7', PieceType.pawn, BlackOrWhite.black),
        ]
    }
}

function korchnoi_v_karpov(): CheckmateBoard {
    return {
        title: 'Korchnoi VS Karpov 1978', board: [
            piece_factory('king_w', 'H7', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'F7', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_w1', 'A3', PieceType.pawn, BlackOrWhite.white),

            piece_factory('pawn_b1', 'A4', PieceType.pawn, BlackOrWhite.black),
            piece_factory('bishop_b1', 'G7', PieceType.bishop, BlackOrWhite.black),
        ]
    }
}

function bernstein_v_smyslov(): CheckmateBoard {
    return {
        title: 'Bernstein VS Smylov', board: [
            piece_factory('king_w', 'F3', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'F5', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_b1', 'F4', PieceType.pawn, BlackOrWhite.black),
            piece_factory('rook_b1', 'B2', PieceType.rook, BlackOrWhite.black, RookType.short_rook),
        ]
    }
}

function matulovic_v_minev(): CheckmateBoard {
    return {
        title: 'Matulovic VS Minev', board: [
            piece_factory('king_w', 'H3', PieceType.king, BlackOrWhite.white),
            piece_factory('king_b', 'H5', PieceType.king, BlackOrWhite.black),

            piece_factory('pawn_b1', 'F4', PieceType.pawn, BlackOrWhite.black),
            piece_factory('rook_b1', 'B2', PieceType.rook, BlackOrWhite.black, RookType.short_rook),
        ]
    }
}

export default list_of_stalemates