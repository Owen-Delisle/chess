import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/variable_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Knight check from North",
        white_king_pos: 'F1',
        black_queen_pos: 'F5',
        expected_result: ['F4']
    },
    {
        title: "Knight check from North East",
        white_king_pos: 'C1',
        black_queen_pos: 'G5',
        expected_result: ['F4']
    },
    {
        title: "Knight check from East",
        white_king_pos: 'C3',
        black_queen_pos: 'G3',
        expected_result: ['G3']
    },
    {
        title: "Knight check from South East",
        white_king_pos: 'C6',
        black_queen_pos: 'H1',
        expected_result: []
    },
    {
        title: "Knight check from South",
        white_king_pos: 'F6',
        black_queen_pos: 'F3',
        expected_result: ['F4']
    },
    {
        title: "Knight check from South West",
        white_king_pos: 'H8',
        black_queen_pos: 'A1',
        expected_result: ['C3', 'D4']
    },
    {
        title: "Knight check from West",
        white_king_pos: 'H3',
        black_queen_pos: 'B3',
        expected_result: ['G3','C3']
    },
    {
        title: "Knight check from North West",
        white_king_pos: 'G1',
        black_queen_pos: 'B6',
        expected_result: ['D4']
    },
]

const knight_check_boards: VariableResultBoard[] = results_board(PieceType.knight, test_inputs)

export default knight_check_boards