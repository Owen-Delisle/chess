import Square from '../square/square'
import { SquareColor } from '../square/color'
import PieceStyles from '../piece/styles'
import SquareStyles from '../square/styles'
import SquareGrid from '../../models/square_grid'
import MoveController from '../../controllers/move_controller'
import { board_start_index, row_and_column_size } from '../../utils/bounds'

export default class Board extends HTMLElement {
	container_node: Element = document.createElement('div')
	static board_size: number = Math.pow(row_and_column_size,2)

	constructor() {
		super()
		this.render()
	}

	render(): void {
		this.add_styles_to_dom()
		this.board_generator()
		MoveController.load_possible_moves_lists()
	}

	private add_styles_to_dom() {
		this.appendChild(SquareStyles.square_style())
		this.appendChild(PieceStyles.piece_style())
	}

	private board_generator(): void {
		this.container_node.className = 'container'
		this.container_node.id = 'container'

		this.add_squares_to_board()

		this.append(this.container_node)
	}

	private add_squares_to_board(): void {
		let next_square: Square
		let row_node: Element = document.createElement('div')

		row_node.className = 'row'
		this.container_node.appendChild(row_node)

		let row_array: Square[] = []
		for (let col = board_start_index; col < Board.board_size; col++) {
			next_square = this.instantiate_square(col)
			next_square.build_clickable_square()

			if (col % row_and_column_size === board_start_index && col > board_start_index) {
				row_node = document.createElement('div')
				row_node.className = 'row'
				this.container_node.appendChild(row_node)
			}

			row_array.push(next_square)
			row_node.appendChild(next_square)

			if (row_array.length === row_and_column_size) {
				SquareGrid.square_grid.push(row_array)
				row_array = []
			}
		}
	}

	private instantiate_square(index: number): Square {
		let color: SquareColor = SquareColor.black
		if (index % 2 === this.current_row(index)) {
			color = SquareColor.white
		}

		let square: Square = new Square(color, index)

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

	public async redraw() {
		SquareGrid.square_grid = []
		document.querySelectorAll('.row').forEach((e) => e.remove())
		this.add_squares_to_board()
		MoveController.clear_possible_moves_lists()
		MoveController.load_possible_moves_lists()
	}
}

customElements.define('board-element', Board)
