import Square from '../square/square'
import { BlackOrWhite } from '../../global_types/enums/black_or_white'
import PieceStyles from '../piece/styles'
import SquareStyles from '../square/styles'
import SquareGrid from '../../models/square_grid'
import MoveController from '../../controllers/move_controller'
import { board_start_index, row_and_column_size } from '../../utils/bounds'
import { GameController } from '../../controllers/game_controller'
import PlayerController from '../../controllers/player_controller'
import GameType from '../../global_types/enums/game_type'
import { UUID } from 'crypto'
import PieceList from 'src/models/piece_list'

export default class Board extends HTMLElement {
	container_node: Element = document.createElement('div')
	board_size: number = Math.pow(row_and_column_size,2)
	piece_list: PieceList
	move_controller: MoveController
	game_controller: GameController

	constructor(game_type: GameType, player_color?: BlackOrWhite, player_id?: UUID, opponent_user_id?: UUID) {
		super()
		if(player_color) {
			PlayerController.player_color = player_color
		}
		if(player_id) {
			PlayerController.player_id = player_id
		}
		if(opponent_user_id) {
			PlayerController.opponent_user_id = opponent_user_id
		}
		
		this.piece_list = new PieceList()
		this.game_controller = new GameController(this.piece_list, game_type)
		this.move_controller = new MoveController(this.game_controller)
		this.render()
	}

	render(): void {
		this.add_styles_to_dom()
		this.board_generator()
		this.move_controller.load_possible_moves_lists()
		this.id = "game_board"
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
		for (let col = board_start_index; col < this.board_size; col++) {
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
		let color: BlackOrWhite = BlackOrWhite.black
		if (index % 2 === this.current_row(index)) {
			color = BlackOrWhite.white
		}

		let square: Square = new Square(color, index, this)

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
		this.move_controller.clear_possible_moves_lists()
		this.move_controller.load_possible_moves_lists()
	}
}

customElements.define('board-element', Board)
