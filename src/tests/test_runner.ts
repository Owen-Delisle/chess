import PieceList from "../models/piece_list"
import Piece from "../components/piece/piece";
import MoveController from "../controllers/move_controller";
import King from "../components/piece/pieces/king";
import { Color } from "../components/piece/color";

import list_of_test_positions from "./test_boards";
import Test from "./test";
import Assert, { AssertType } from "./assert";

export default class TestRunner {
    white_king: King | undefined
    black_king: King | undefined

    constructor() {
    }

    private before_each(test_position: {title: string, board: Piece[]}) {
        PieceList.piece_list = test_position.board
        MoveController.load_possible_moves_lists()
        this.white_king = PieceList.king_by_color(Color.white)
        this.black_king = PieceList.king_by_color(Color.black)
    }

    public build_test_list(): Test[] {
        const test_list: Test[] = []
        list_of_test_positions.forEach(test_position => {
            this.before_each(test_position)
            const assert = new Assert(AssertType.equals, this.white_king!.check_for_checkmate(), 'Game Over: Checkmate')
            test_list.push(new Test(test_position.title, assert))
        })
        return test_list
    }
}
