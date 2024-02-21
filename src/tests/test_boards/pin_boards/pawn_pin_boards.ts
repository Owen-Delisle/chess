import { PieceType } from "../../../components/piece/piece_types"
import VariableResultBoard from "../../types/subject_result_board"
import BoardSetupInput from "../../../tests/types/board_setup_input"
import results_board from "../results_board"

const test_inputs: BoardSetupInput[] = [
    {
        title: "Pawn Pin from North",
        white_king_pos: 'E1',
        black_queen_pos: 'E5',
        expected_result: ['E3','E4']
    },
    {
        title: "Pawn Pin from North East",
        white_king_pos: 'D1',
        black_queen_pos: 'G4',
        expected_result: []
    },
    {
        title: "Pawn Pin from East",
        white_king_pos: 'C2',
        black_queen_pos: 'G2',
        expected_result: []
    },
    {
        title: "Pawn Pin from South East",
        white_king_pos: 'C4',
        black_queen_pos: 'F1',
        expected_result: []
    },
    {
        title: "Pawn Pin from South",
        white_king_pos: 'E5',
        black_queen_pos: 'E1',
        expected_result: ['E3','E4']
    },
    {
        title: "Pawn Pin from South West",
        white_king_pos: 'G4',
        black_queen_pos: 'D1',
        expected_result: []
    },
    {
        title: "Pawn Pin from West",
        white_king_pos: 'G2',
        black_queen_pos: 'C2',
        expected_result: []
    },
    {
        title: "Pawn Pin from North West",
        white_king_pos: 'F1',
        black_queen_pos: 'C4',
        expected_result: []
    },
]

const pawn_pin_boards: VariableResultBoard[] = results_board(PieceType.pawn, test_inputs)

export default pawn_pin_boards