import PieceList from "../models/piece_list"
import MoveController from "../controllers/move_controller";
import King from "../components/piece/pieces/king";
import { Color } from "../components/piece/color";
import VariableResultBoard from "./types/subject_result_board";
import CheckmateBoard from "./types/check_mate_board";

import list_of_checkmate_boards from "./test_boards/end_of_game/checkmate_boards";

import pawn_pin_boards from "./test_boards/pin_boards/pawn_pin_boards";
import rook_pin_boards from "./test_boards/pin_boards/rook_pin_boards";
import bishop_pin_boards from "./test_boards/pin_boards/bishop_pin_boards";
import knight_pin_boards from "./test_boards/pin_boards/knight_pin_boards";
import queen_pin_boards from "./test_boards/pin_boards/queen_pin_boards";

import pawn_check_boards from "./test_boards/check_boards/pawn_check_board";
import bishop_check_boards from "./test_boards/check_boards/bishop_check_board";
import rook_check_boards from "./test_boards/check_boards/rook_check_board";
import knight_check_boards from "./test_boards/check_boards/knight_check_board";
import queen_check_boards from "./test_boards/check_boards/queen_check_board";

import castle_boards from "./test_boards/special_moves/castle_boards";

import Test from "./test";
import Assert, { AssertType } from "./assert";

import Square from "../components/square/square";
import SquareGrid from "../models/square_grid";
import Piece from "../components/piece/piece";

export default class TestRunner {
    constructor() {
    }

    private before_each(test_position: CheckmateBoard) {
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

    public build_pin_boards(): Test[] {
        const test_list: Test[] = []
        const pin_boards: VariableResultBoard[] = [
            ...pawn_pin_boards,
            ...rook_pin_boards,
            ...bishop_pin_boards,
            ...knight_pin_boards,
            ...queen_pin_boards
        ]

        pin_boards.forEach(board => {
            this.before_each(board)
            const assert = new Assert(AssertType.equals, board.subject_piece.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_check_boards(): Test[] {
        const test_list: Test[] = []
        const check_boards: VariableResultBoard[] = [
            ...pawn_check_boards,
            ...rook_check_boards,
            ...bishop_check_boards,
            ...knight_check_boards,
            ...queen_check_boards
        ]

        check_boards.forEach(board => {
            this.before_each(board)
            const assert = new Assert(AssertType.equals, board.subject_piece.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_castle_boards(): Test[] {
        const test_list: Test[] = []

        castle_boards.forEach(board => {
            this.before_each(board)
            const king_square: Square | undefined = SquareGrid.square_by_board_position(board.subject_piece[0].pos)
            const rook_square: Square | undefined = SquareGrid.square_by_board_position(board.subject_piece[1].pos)

            const assert = new Assert(AssertType.equals, MoveController.conditions_for_castle(king_square, rook_square!), board.expected_result)
            test_list.push(new Test(board.title, assert))
        })

        return test_list
    }
}
