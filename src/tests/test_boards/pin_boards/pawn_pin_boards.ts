import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import Piece from "../../../components/piece/piece"

const pawn_pin_boards: { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] }[] = [
    pawn_pin_north(),
    pawn_pin_north_east(),
    pawn_pin_east(),
    pawn_pin_south_east(),
    pawn_pin_south(),
    pawn_pin_south_west(),
    pawn_pin_west(),
    pawn_pin_north_west()
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

function pawn_pin_south_west(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from South West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'G4', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'D1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function pawn_pin_west(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'F2', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'D2', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function pawn_pin_north_west(): { title: string, board: Piece[], subject_piece: Piece, expected_result: string[] } {
    const subject_piece: Piece = piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white)
    return {
        title: 'Pawn Pin from North West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'F1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'D3', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['D3']
    }
}

export default pawn_pin_boards