import PieceList from "../models/piece_list"
import MoveController from "../controllers/move_controller";
import King from "../components/piece/pieces/king";
import { BlackOrWhite } from "../global_types/enums/black_or_white";
import VariableResultBoard from "./types/subject_result_board";
import CheckmateBoard from "./types/check_mate_board";

import list_of_checkmate_boards from "./test_boards/end_of_game/checkmate_boards";
import list_of_stalemates from "./test_boards/end_of_game/stalemate_boards";

import pawn_pin_boards from "./test_boards/pin_boards/pawn_pin_boards";
import rook_pin_boards from "./test_boards/pin_boards/rook_pin_boards";
import bishop_pin_boards from "./test_boards/pin_boards/bishop_pin_boards";
import knight_pin_boards from "./test_boards/pin_boards/knight_pin_boards";
import queen_pin_boards from "./test_boards/pin_boards/queen_pin_boards";

import pawn_pin_attack_boards from "./test_boards/pin_boards/pawn_pin_with_attack";

import pawn_check_boards from "./test_boards/check_boards/pawn_check_board";
import bishop_check_boards from "./test_boards/check_boards/bishop_check_board";
import rook_check_boards from "./test_boards/check_boards/rook_check_board";
import knight_check_boards from "./test_boards/check_boards/knight_check_board";
import queen_check_boards from "./test_boards/check_boards/queen_check_board";
import promotion_boards from "./test_boards/special_moves/promotion_boards";
import en_passant_boards from "./test_boards/special_moves/en_passant_boards";

import castle_boards from "./test_boards/special_moves/castle_boards";

import Test from "./test";
import Assert, { AssertType } from "./assert";

import Square from "../components/square/square";
import SquareGrid from "../models/square_grid";
import { GameController } from "../controllers/game_controller";
import MoveList from "../utils/classes/move_list";

export default class TestRunner {
    square_grid: SquareGrid
    piece_list: PieceList
    game_controller: GameController
    move_controller: MoveController
    

    constructor(square_grid: SquareGrid, piece_list: PieceList, move_controller: MoveController, game_controller: GameController) {
        this.square_grid = square_grid
        this.piece_list = piece_list
        this.move_controller = move_controller
        this.game_controller = game_controller
    }

    private before_each(test_position: CheckmateBoard) {
        this.piece_list.list = test_position.board
        this.move_controller.load_possible_moves_lists()
    }

    public build_checkmate_board_list(): Test[] {
        const test_list: Test[] = []
        list_of_checkmate_boards.forEach(board => {
            this.before_each(board)
            const white_king: King = this.piece_list.king_by_color(BlackOrWhite.white)

            const assert = new Assert(AssertType.equals, white_king!.check_for_checkmate(this.piece_list), 'Game Over: Checkmate')
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_stalemate_board_list(): Test[] {
        const test_list: Test[] = []
        list_of_stalemates.forEach(board => {
            this.before_each(board)
            const white_king: King = this.piece_list.king_by_color(BlackOrWhite.white)

            const assert = new Assert(AssertType.equals, white_king!.check_for_checkmate(this.piece_list), 'Game Over: Stalemate')
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
            const assert = new Assert(AssertType.equals, board.subject.possible_moves, board.expected_result)
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
            const assert = new Assert(AssertType.equals, board.subject.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }

    public build_castle_boards(): Test[] {
        const test_list: Test[] = []

        castle_boards.forEach(board => {
            this.before_each(board)
            const king_square: Square | undefined = this.square_grid.square_by_board_position(board.subject[0].pos)
            const rook_square: Square | undefined = this.square_grid.square_by_board_position(board.subject[1].pos)

            const assert = new Assert(AssertType.equals, this.move_controller.conditions_for_castle(king_square, rook_square!), board.expected_result)
            test_list.push(new Test(board.title, assert))
        })

        return test_list
    }

    public build_promotion_boards(): Test[] {
        const test_list: Test[] = []

        promotion_boards.forEach(board => {
            this.before_each(board)
            const pawn_row: number = this.square_grid.point_at_board_position(board.subject.pos)!.row

            const assert = new Assert(AssertType.equals, board.subject.should_make_queen(pawn_row), board.expected_result)
            test_list.push(new Test(board.title, assert))
        })

        return test_list
    }

    public build_en_passant_boards() {
        const test_list: Test[] = []

        en_passant_boards.forEach(board => {
            this.before_each(board)
            this.game_controller.move_list = new MoveList()
            this.game_controller.move_list.add_move(board.subject.move)

            const res: boolean = board.subject.white_pawn.conditions_for_en_passant(board.subject.black_pawn)
            const assert = new Assert(AssertType.equals, res, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })

        return test_list
    }

    public build_pawn_pin_attack_boards() {
        const test_list: Test[] = []
        pawn_pin_attack_boards.forEach(board => {
            this.before_each(board)

            const assert = new Assert(AssertType.equals, board.subject.possible_moves, board.expected_result)
            test_list.push(new Test(board.title, assert))
        })
        return test_list
    }
}
