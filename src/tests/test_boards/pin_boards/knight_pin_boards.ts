import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import Piece from "../../../components/piece/piece"
import PinBoard from "../../types/PinBoard"

const knight_pin_boards: PinBoard[] = [
    knight_pin_north(),
    knight_pin_north_east(),
    knight_pin_east(),
    knight_pin_south_east(),
    knight_pin_south(),
    knight_pin_south_west(),
    knight_pin_west(),
    knight_pin_north_west()
]

function knight_pin_north(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from North', 
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

function knight_pin_north_east(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from North East', 
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

function knight_pin_east(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from East', 
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

function knight_pin_south_east(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from South East', 
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

function knight_pin_south(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from South', 
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

function knight_pin_south_west(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from South West', 
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

function knight_pin_west(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from West', 
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

function knight_pin_north_west(): PinBoard {
    const subject_piece: Piece = piece_factory('knight_w1', 'E2', PieceType.knight, Color.white)
    return {
        title: 'Knight Pin from North West', 
        board: [
            subject_piece,
            piece_factory('king_w', 'F1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('queen_b', 'C4', PieceType.queen, Color.black),
        ],
        subject_piece: subject_piece,
        expected_result: []
    }
}

export default knight_pin_boards