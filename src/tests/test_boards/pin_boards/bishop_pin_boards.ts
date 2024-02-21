import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import Piece from "../../../components/piece/piece"
import VariableResultBoard from "../../types/variable_result_board"

const bishop_pin_boards: VariableResultBoard[] = [
    bishop_pin_north(),
    bishop_pin_north_east(),
    bishop_pin_east(),
    bishop_pin_south_east(),
    bishop_pin_south(),
    bishop_pin_south_west(),
    bishop_pin_west(),
    bishop_pin_north_west()
]

function bishop_pin_north(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from North', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('queen_b', 'E6', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function bishop_pin_north_east(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from North East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('queen_b', 'G4', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['F3', 'G4']
    }
}

function bishop_pin_east(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from East', 
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

function bishop_pin_south_east(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from South East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D3', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'F1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['F1']
    }
}

function bishop_pin_south(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from South', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E5', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'E1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

function bishop_pin_south_west(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from South West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'G4', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'D1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['F3', 'D1']
    }
}

function bishop_pin_west(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from West', 
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

function bishop_pin_north_west(): VariableResultBoard {
    const subject_piece: Piece = piece_factory('bishop_w1', 'E2', PieceType.bishop, Color.white)
    return {
        title: 'Bishop Pin from North West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'F1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'C4', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['D3', 'C4']
    }
}

export default bishop_pin_boards