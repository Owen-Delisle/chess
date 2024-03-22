import Piece from "../../components/piece/piece"
import piece_factory from "../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../components/piece/piece_types"
import VariableResultBoard from "../types/subject_result_board"
import { BlackOrWhite } from "../../global_types/enums/black_or_white"

export default function setup_board(
    title: string, 
    subject: Piece, 
    white_king_pos: string, 
    black_queen_pos: string, 
    expected_result: string[]): VariableResultBoard {
    return {
        title: title,
        board: [
            subject,
            piece_factory('king_b', 'E8', PieceType.king, BlackOrWhite.black),

            //Variable positions
            piece_factory('king_w', white_king_pos, PieceType.king, BlackOrWhite.white),
            piece_factory('queen_b', black_queen_pos, PieceType.queen, BlackOrWhite.black),
        ],
        subject,
        expected_result: expected_result
    }
}