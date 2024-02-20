import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import Piece from "../../../components/piece/piece"
import PinBoard from "../../../tests/types/PinBoard"

const queen_pin_boards: PinBoard[] = [
    queen_pin_north(),
    queen_pin_north_east(),
    queen_pin_east(),
    queen_pin_south_east(),
    queen_pin_south(),
    queen_pin_south_west(),
    queen_pin_west(),
    queen_pin_north_west()
]

function queen_pin_north(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from North', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('queen_b', 'E6', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['E3', 'E4', 'E5', 'E6']
    }
}

function queen_pin_north_east(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from North East', 
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

function queen_pin_east(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from East', 
        board: [
            subject_piece,
            piece_factory('king_w', 'D2', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'G2', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['F2', 'G2']
    }
}

function queen_pin_south_east(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from South East', 
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

function queen_pin_south(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from South', 
        board: [
            subject_piece,
            piece_factory('king_w', 'E5', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'E1', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['E3', 'E4', 'E1']
    }
}

function queen_pin_south_west(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from South West', 
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

function queen_pin_west(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'F2', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'D2', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: ['D2']
    }
}

function queen_pin_north_west(): PinBoard {
    const subject_piece: Piece = piece_factory('queen_w1', 'E2', PieceType.queen, Color.white)
    return {
        title: 'Queen Pin from North West', 
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

export default queen_pin_boards