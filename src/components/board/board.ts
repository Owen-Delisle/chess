import Square from '../square/square'
import { Color } from "../square/color"
import PieceStyles from '../piece/styles';
import PieceList from '../piece/piece_list';
import { SquareID } from '../square/square_id';
import SquareStyles from '../square/styles';

export default class Board extends HTMLElement {
	constructor() {
		super();
		// this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
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
			let next_square: Square

			let container_node: Element = document.createElement("div")
			container_node.className = "container"
			container_node.id = "container"

			let row_node: Element = document.createElement("div")
			row_node.className = "row"

			container_node.appendChild(row_node)

			for (let i = 0; i < 64; i++) {
				next_square = this.instantiate_square(i)
				next_square.append_children();
				if (i % 8 === 0 && i > 1) {
					row_node = document.createElement("div")
					row_node.className = "row"
					container_node.appendChild(row_node)
				} 
				row_node.appendChild(next_square)
			}

			this.append(container_node)
			resolve("Board Finished")
		})
	}

	private instantiate_square(i: number): Square {
		let color: Color = Color.black
		if (i % 2 === this.current_row(i)) {
			color = Color.white
		}

		let square: Square =
			new Square(color, i, PieceList.pieceAt(SquareID.posAtIndex(i)))

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

}

customElements.define('board-element', Board);