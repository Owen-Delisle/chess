import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/variable_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Bishop Pin from North",
        white_king_pos: 'E1',
        black_queen_pos: 'E5',
        expected_result: []
    },
    {
        title: "Bishop Pin from North East",
        white_king_pos: 'D1',
        black_queen_pos: 'G4',
        expected_result: ['F3', 'G4']
    },
    {
        title: "Bishop Pin from East",
        white_king_pos: 'C2',
        black_queen_pos: 'G2',
        expected_result: []
    },
    {
        title: "Bishop Pin from South East",
        white_king_pos: 'C4',
        black_queen_pos: 'F1',
        expected_result: ['F1','D3']
    },
    {
        title: "Bishop Pin from South",
        white_king_pos: 'E5',
        black_queen_pos: 'E1',
        expected_result: []
    },
    {
        title: "Bishop Pin from South West",
        white_king_pos: 'G4',
        black_queen_pos: 'D1',
        expected_result: ['F3','D1']
    },
    {
        title: "Bishop Pin from West",
        white_king_pos: 'G2',
        black_queen_pos: 'C2',
        expected_result: []
    },
    {
        title: "Bishop Pin from North West",
        white_king_pos: 'F1',
        black_queen_pos: 'C4',
        expected_result: ['D3', 'C4']
    },
]

const bishop_pin_boards: VariableResultBoard[] = results_board(PieceType.bishop, test_inputs)

export default bishop_pin_boards