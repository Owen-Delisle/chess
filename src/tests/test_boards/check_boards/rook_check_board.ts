import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/subject_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Rook check from North",
        white_king_pos: 'F1',
        black_queen_pos: 'F5',
        expected_result: ['F2']
    },
    {
        title: "Rook check from North East",
        white_king_pos: 'C1',
        black_queen_pos: 'G5',
        expected_result: ['E3', 'D2']
    },
    {
        title: "Rook check from East",
        white_king_pos: 'C3',
        black_queen_pos: 'G3',
        expected_result: ['E3']
    },
    {
        title: "Rook check from South East",
        white_king_pos: 'C6',
        black_queen_pos: 'H1',
        expected_result: ['E4', 'G2']
    },
    {
        title: "Rook check from South",
        white_king_pos: 'F6',
        black_queen_pos: 'F3',
        expected_result: []
    },
    {
        title: "Rook check from South West",
        white_king_pos: 'H8',
        black_queen_pos: 'A1',
        expected_result: ['E5', 'B2']
    },
    {
        title: "Rook check from West",
        white_king_pos: 'G3',
        black_queen_pos: 'C3',
        expected_result: ['E3']
    },
    {
        title: "Rook check from North West",
        white_king_pos: 'G1',
        black_queen_pos: 'C5',
        expected_result: ['E3', 'F2']
    },
]

const rook_check_boards: VariableResultBoard[] = results_board(PieceType.rook, test_inputs)

export default rook_check_boards