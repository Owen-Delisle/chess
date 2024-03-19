import { board_start_index, row_and_column_size } from "src/utils/bounds";
import SquareStyles from "../square/styles";
import { BlackOrWhite } from "src/global_types/enums/black_or_white";
import PlaceHolderSquare from "../square/place_holder_square";

export default class PlaceHolderBoard extends HTMLElement {
    container_node: Element = document.createElement('div')
    board_size: number = Math.pow(row_and_column_size,2)

    constructor() {
        super()
    }

    connectedCallback() {
        this.render();
    }

    render(): void {
		this.add_styles_to_dom()
		this.board_generator()
        this.add_no_opponent_message()
	}

	private add_styles_to_dom() {
		this.appendChild(SquareStyles.square_style())
	}

	private board_generator(): void {
		this.container_node.className = 'container'
		this.container_node.id = 'container'

		this.add_squares_to_board()

		this.append(this.container_node)
	}

	private add_squares_to_board(): void {
		let next_square: PlaceHolderSquare
		let row_node: Element = document.createElement('div')

		row_node.className = 'row'
		this.container_node.appendChild(row_node)

		let row_array: PlaceHolderSquare[] = []
		for (let col = board_start_index; col < this.board_size; col++) {
			next_square = this.instantiate_square(col)

			if (col % row_and_column_size === board_start_index && col > board_start_index) {
				row_node = document.createElement('div')
				row_node.className = 'row'
				this.container_node.appendChild(row_node)
			}

			row_array.push(next_square)
			row_node.appendChild(next_square)
		}
	}

    private add_no_opponent_message() {
        const message = document.createElement('p')
        message.className = "big-message"
        message.innerHTML = 'Challenge an active player to start Online Game'

        this.container_node.appendChild(message)
    }

	private instantiate_square(index: number): PlaceHolderSquare {
		let color: BlackOrWhite = BlackOrWhite.black
		if (index % 2 === this.current_row(index)) {
			color = BlackOrWhite.white
		}

		let square: PlaceHolderSquare = new PlaceHolderSquare(color)

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

customElements.define('placeholder-board-element', PlaceHolderBoard)