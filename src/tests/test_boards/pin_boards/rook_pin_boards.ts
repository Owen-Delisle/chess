import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/variable_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Rook from North",
        white_king_pos: 'E1',
        black_queen_pos: 'E5',
        expected_result: ['E3','E4', 'E5']
    },
    {
        title: "Rook from North East",
        white_king_pos: 'D1',
        black_queen_pos: 'G4',
        expected_result: []
    },
    {
        title: "Rook from East",
        white_king_pos: 'C2',
        black_queen_pos: 'G2',
        expected_result: ['F2','G2', 'D2']
    },
    {
        title: "Rook from South East",
        white_king_pos: 'C4',
        black_queen_pos: 'F1',
        expected_result: []
    },
    {
        title: "Rook from South",
        white_king_pos: 'E5',
        black_queen_pos: 'E1',
        expected_result: ['E3','E4','E1']
    },
    {
        title: "Rook from South West",
        white_king_pos: 'G4',
        black_queen_pos: 'D1',
        expected_result: []
    },
    {
        title: "Rook from West",
        white_king_pos: 'G2',
        black_queen_pos: 'C2',
        expected_result: ['F2','D2','C2']
    },
    {
        title: "Rook from North West",
        white_king_pos: 'F1',
        black_queen_pos: 'C4',
        expected_result: []
    },
]

const rook_pin_boards: VariableResultBoard[] = results_board(PieceType.rook, test_inputs)

export default rook_pin_boards