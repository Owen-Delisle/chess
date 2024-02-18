import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import Piece from "../../../components/piece/piece"

const pawn_pin_boards: { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] }[] = [
    pawn_pin_north(),
    pawn_pin_north_east(),
    pawn_pin_east(),
    pawn_pin_south_east(),
    pawn_pin_south()
]

function pawn_pin_north(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from North', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('queen_b', 'E6', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['E3', 'E4']
    }
}

function pawn_pin_north_east(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from North East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('queen_b', 'G4', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function pawn_pin_east(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D2', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'G2', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function pawn_pin_south_east(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from South East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D3', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'F1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function pawn_pin_south(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from South', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E5', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'E1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['E3', 'E4']
    }
}

export default pawn_pin_boards