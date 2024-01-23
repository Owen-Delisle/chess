import Square from '../square/square'
import { Color } from "../square/color"
import PieceStyles from '../piece/styles';
import PieceList from '../piece/piece_list';
import SquareID from '../square/square_id';
import SquareStyles from '../square/styles';
import SquareGrid from '../../models/square_grid'

export default class Board extends HTMLElement {
	container_node: Element = document.createElement("div")

	constructor() {
		super();
		this.render();
	}

	connectedCallback() {
	}

	render() {
		this.add_styles_to_dom()
		this.setup_game_board()
	}

	private add_styles_to_dom() {
		this.appendChild(SquareStyles.square_style())
		this.appendChild(PieceStyles.piece_style())
	}

	private async setup_game_board(): Promise<void> {
		let res = await this.board_generator()
		console.log(res)
	}

	private board_generator(): Promise<string> {
		return new Promise(resolve => {
			this.container_node.className = "container"
			this.container_node.id = "container"

			this.add_squares_to_board()

			this.append(this.container_node)
			resolve("Board Finished")
		})
	}

	private add_squares_to_board() {
		let next_square: Square
		let row_node: Element = document.createElement("div")

			row_node.className = "row"
			this.container_node.appendChild(row_node)

			let row_array: Square[] = []
			for (let col = 0; col < 64; col++) {
				next_square = this.instantiate_square(col)
				next_square.build_clickable_square()

				if (col % 8 === 0 && col > 0) {
					row_node = document.createElement("div")
					row_node.className = "row"
					this.container_node.appendChild(row_node)
				}

				row_array.push(next_square)
				row_node.appendChild(next_square)

				if (row_array.length === 8) { 
					SquareGrid.square_grid.push(row_array)
					row_array = []
				}
			}
	}

	private instantiate_square(index: number): Square {
		let color: Color = Color.black
		if (index % 2 === this.current_row(index)) {
			color = Color.white
		}

		let square: Square =
			new Square(color, index, PieceList.pieceAt(SquareID.pos_at_index(index)))

		return square
	}

	private current_row(i: number): number {
		let mod: number = 0

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

	public redraw() {
		document.querySelectorAll(".row").forEach(e => e.remove())
		this.add_squares_to_board()
	}
}

customElements.define('board-element', Board);