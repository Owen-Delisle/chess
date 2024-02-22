import { PieceType } from "../../components/piece/piece_types"
import VariableResultBoard from "../types/subject_result_board"
import BoardSetupInput from "../types/board_setup_input"
import setup_board from "./setup_board"
import subject_piece from "./subject_piece"

export default function results_board(piece_type: PieceType, test_inputs: BoardSetupInput[]): VariableResultBoard[] {
    return test_inputs.map(input => {
        const {title, white_king_pos, black_queen_pos, expected_result} = input
        return setup_board(title, subject_piece(piece_type), white_king_pos, black_queen_pos, expected_result)
    })
}
