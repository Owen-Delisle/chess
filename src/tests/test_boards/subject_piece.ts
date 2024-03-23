import Piece from "../../components/piece/piece"
import { BlackOrWhite } from "../../global_types/enums/black_or_white"
import piece_factory from "../../components/piece/piece_factory/piece_factory"
import { RookType } from "../../components/piece/pieces/rook"
import { PieceType } from "../../components/piece/piece_types"

export default function subject_piece(piece_type: PieceType): Piece {
    return piece_type === PieceType.rook ? 
    piece_factory('rook_w1', 'E2', PieceType.rook, BlackOrWhite.white, RookType.short_rook) : 
    piece_factory('moch_w1', 'E2', piece_type, BlackOrWhite.white)
}