import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/variable_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Pawn check from North",
        white_king_pos: 'F1',
        black_queen_pos: 'F5',
        expected_result: []
    },
    {
        title: "Pawn check from North East",
        white_king_pos: 'C1',
        black_queen_pos: 'G5',
        expected_result: ['E3']
    },
    {
        title: "Pawn check from East",
        white_king_pos: 'C3',
        black_queen_pos: 'G3',
        expected_result: ['E3']
    },
    {
        title: "Pawn check from South East",
        white_king_pos: 'C6',
        black_queen_pos: 'H1',
        expected_result: ['E4']
    },
    {
        title: "Pawn check from South",
        white_king_pos: 'F6',
        black_queen_pos: 'F3',
        expected_result: ['F3']
    },
    {
        title: "Pawn check from South West",
        white_king_pos: 'G8',
        black_queen_pos: 'A2',
        expected_result: []
    },
    {
        title: "Pawn check from West",
        white_king_pos: 'G3',
        black_queen_pos: 'D3',
        expected_result: ['E3','D3']
    },
    {
        title: "Pawn check from North West",
        white_king_pos: 'H1',
        black_queen_pos: 'A8',
        expected_result: ['E4']
    },
]

const bishop_check_boards: VariableResultBoard[] = results_board(PieceType.pawn, test_inputs)

export default bishop_check_boards