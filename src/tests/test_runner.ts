import PieceList from "../models/piece_list"
import Piece from "../components/piece/piece";
import MoveController from "../controllers/move_controller";
import King from "../components/piece/pieces/king";
import { Color } from "../components/piece/color";

import list_of_checkmate_boards from "./test_boards/checkmate_boards";
import pawn_pin_boards from "./test_boards/pin_boards/pawn_pin_boards";
import rook_pin_boards from "./test_boards/pin_boards/rook_pin_boards";
import bishop_pin_boards from "./test_boards/pin_boards/bishop_pin_boards";

import Test from "./test";
import Assert, { AssertType } from "./assert";

export default class TestRunner {
    constructor() {
    }

    private before_each(test_position: {title: string, board: Piece[]}) {
        PieceList.piece_list = test_position.board
        MoveController.load_possible_moves_lists()
    }

    public build_checkmate_board_list(): Test[] {
        const test_list: Test[] = []
        list_of_checkmate_boards.forEach(board => {

            this.before_each(board)
            const white_king: King = PieceList.king_by_color(Color.white)

            const assert = new Assert(AssertType.equals, white_king!.check_for_checkmate(), 'Game Over: Checkmate')
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_pawn_pin_board_list(): Test[] {
        const test_list: Test[] = []
        pawn_pin_boards.forEach(board => {

            this.before_each(board)
            const assert = new Assert(AssertType.equals, board.subject_piece.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_rook_pin_board_list(): Test[] {
        const test_list: Test[] = []
        rook_pin_boards.forEach(board => {

            this.before_each(board)
            const assert = new Assert(AssertType.equals, board.subject_piece.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_bishop_pin_board_list(): Test[] {
        const test_list: Test[] = []
        bishop_pin_boards.forEach(board => {

            this.before_each(board)
            const assert = new Assert(AssertType.equals, board.subject_piece.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }
}
