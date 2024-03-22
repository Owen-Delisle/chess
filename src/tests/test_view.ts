import Square from '../components/square/square'
import MoveController from '../controllers/move_controller'
import Board from '../components/board/board'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import SquareGrid from '../models/square_grid'
import { board_start_index, row_and_column_size } from '../utils/bounds'
import TestRunner from './test_runner'
import TestStyles from './styles'
import Test from './test'
import PieceList from '../models/piece_list'
import { GameController } from '../controllers/game_controller'
import GameType from 'src/global_types/enums/game_type'

export default class TestView extends HTMLElement {
    square_grid: SquareGrid
    piece_list: PieceList
    move_controller: MoveController
    game_controller: GameController
    board: Board
    constructor(square_grid: SquareGrid, piece_list: PieceList, move_controller: MoveController, game_controller: GameController) {
        super()
        this.square_grid = square_grid
        this.piece_list = piece_list
        this.move_controller = move_controller
        this.game_controller = game_controller
        this.board = new Board(GameType.offline, BlackOrWhite.white)
        this.render()
    }

    render(): void {
        this.build_square_grid()
        this.move_controller.load_possible_moves_lists()
        this.append_children()
    }

    private append_children(): Promise<void> {
        return new Promise(async (resolve) => {
            this.appendChild(TestStyles.test_style())

            let test_view: Element = document.createElement('div')
            test_view.className = "test_view"
            this.appendChild(test_view)
            this.className = "test_view"

            const test_runner = new TestRunner(this.square_grid, this.piece_list, this.move_controller, this.game_controller)

            this.render_board_list(test_runner.build_checkmate_board_list(), test_view, "Checkmate Tests")
            this.render_board_list(test_runner.build_stalemate_board_list(), test_view, "Stalemate Tests")
            this.render_board_list(test_runner.build_check_boards(), test_view, "Block Check Tests")

            const special_tests: Test[] = [
                ...test_runner.build_castle_boards(), 
                ...test_runner.build_promotion_boards(),
                ...test_runner.build_en_passant_boards(),
            ]

            this.render_board_list(special_tests, test_view, "Special Moves Tests")

            const pin_tests: Test[] = [
                ...test_runner.build_pin_boards(),
                ...test_runner.build_pawn_pin_attack_boards()
            ]

            this.render_board_list(pin_tests, test_view, "Pin Tests")

            resolve()
        })
    }

    private render_board_list(tests: Test[], test_view: Element, title: string) {
        let test_node: Element = document.createElement('div')
        test_node.className = "test_list"
        this.add_title(test_node, title)

        tests.forEach(test => {
            test_node.appendChild(test)
        })

        test_view.appendChild(test_node)
    }

    private add_title(el: Element, content: string) {
        let title: Element = document.createElement('p')
        title.textContent = content
        el.appendChild(title)
    }

    private build_square_grid(): void {
        let next_square: Square
        let row_array: Square[] = []
        for (let col = board_start_index; col < 64; col++) {
            next_square = this.instantiate_square(col)

            row_array.push(next_square)

            if (row_array.length === row_and_column_size) {
                this.square_grid.grid.push(row_array)
                row_array = []
            }
        }
    }

    private instantiate_square(index: number): Square {
        let color: BlackOrWhite = BlackOrWhite.black
        if (index % 2 === this.current_row(index)) {
            color = BlackOrWhite.white
        }

        let square: Square = new Square(color, index, this.board)

        return square
    }

    private current_row(i: number): number {
        let mod: number = board_start_index

        if (i > 7 && i < 16) {
            mod = 1
        } else if (i > 23 && i < 32) {
            mod = 1
        } else if (i > 39 && i < 48) {
            mod = 1
        } else if (i > 55) {
            mod = 1
        }

        return mod
    }
}

customElements.define('test-element', TestView)