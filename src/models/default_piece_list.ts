import piece_factory from "../components/piece/piece_factory/piece_factory"
import { PieceType } from "../components/piece/piece_types"
import { BlackOrWhite } from "../global_types/enums/black_or_white"
import { RookType } from "../components/piece/pieces/rook"
import Piece from "../components/piece/piece"

function default_piece_list(): Piece[] {
    return [
        piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),
        piece_factory('king_w', 'E1', PieceType.king, BlackOrWhite.white),

        piece_factory('queen_b', 'D8', PieceType.queen, BlackOrWhite.black),
        piece_factory('queen_w', 'D1', PieceType.queen, BlackOrWhite.white),

        piece_factory('bishop_b1', 'C8', PieceType.bishop, BlackOrWhite.black),
        piece_factory('bishop_w1', 'C1', PieceType.bishop, BlackOrWhite.white),
        piece_factory('bishop_b2', 'F8', PieceType.bishop, BlackOrWhite.black),
        piece_factory('bishop_w2', 'F1', PieceType.bishop, BlackOrWhite.white),

        piece_factory('knight_w1', 'B1', PieceType.knight, BlackOrWhite.white),
        piece_factory('knight_b1', 'B8', PieceType.knight, BlackOrWhite.black),
        piece_factory('knight_b2', 'G8', PieceType.knight, BlackOrWhite.black),
        piece_factory('knight_w2', 'G1', PieceType.knight, BlackOrWhite.white),

        piece_factory('rook_b1', 'A8', PieceType.rook, BlackOrWhite.black, RookType.long_rook),
        piece_factory('rook_w1', 'A1', PieceType.rook, BlackOrWhite.white, RookType.long_rook),
        piece_factory('rook_b2', 'H8', PieceType.rook, BlackOrWhite.black, RookType.short_rook),
        piece_factory('rook_w2', 'H1', PieceType.rook, BlackOrWhite.white, RookType.short_rook),

        piece_factory('pawn_b1', 'A7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w1', 'A2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b2', 'B7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w2', 'B2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b3', 'C7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w3', 'C2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b4', 'D7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w4', 'D2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b5', 'E7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w5', 'E2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b6', 'F7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w6', 'F2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b7', 'G7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w7', 'G2', PieceType.pawn, BlackOrWhite.white),
        piece_factory('pawn_b8', 'H7', PieceType.pawn, BlackOrWhite.black),
        piece_factory('pawn_w8', 'H2', PieceType.pawn, BlackOrWhite.white),
    ]
}

export default default_piece_list