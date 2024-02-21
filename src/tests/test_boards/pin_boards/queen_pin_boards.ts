import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/variable_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Queen Pin from North",
        white_king_pos: 'E1',
        black_queen_pos: 'E5',
        expected_result: ['E3','E4', 'E5']
    },
    {
        title: "Queen Pin from North East",
        white_king_pos: 'D1',
        black_queen_pos: 'G4',
        expected_result: ['F3', 'G4']
    },
    {
        title: "Queen Pin from East",
        white_king_pos: 'C2',
        black_queen_pos: 'G2',
        expected_result: ['F2','G2', 'D2']
    },
    {
        title: "Queen Pin from South East",
        white_king_pos: 'C4',
        black_queen_pos: 'F1',
        expected_result: ['F1','D3']
    },
    {
        title: "Queen Pin from South",
        white_king_pos: 'E5',
        black_queen_pos: 'E1',
        expected_result: ['E3','E4','E1']
    },
    {
        title: "Queen Pin from South West",
        white_king_pos: 'G4',
        black_queen_pos: 'D1',
        expected_result: ['F3','D1']
    },
    {
        title: "Queen Pin from West",
        white_king_pos: 'G2',
        black_queen_pos: 'C2',
        expected_result: ['F2','D2','C2']
    },
    {
        title: "Queen Pin from North West",
        white_king_pos: 'F1',
        black_queen_pos: 'C4',
        expected_result: ['D3', 'C4']
    },
]

const queen_pin_boards: VariableResultBoard[] = results_board(PieceType.queen, test_inputs)

export default queen_pin_boards