import { BlackOrWhite } from '../../global_types/enums/black_or_white'
import SquareID from './square_id'
import Piece from '../piece/piece'
import MoveController from '../../controllers/move_controller'
import { GameController } from '../../controllers/game_controller'
import GameType from '../../global_types/enums/game_type'
import ClientWebSocket from '../../server/client_websocket'
import KingCheckStatusMessage, { CheckStatus } from '../../server/messages/king_check_message'
import PlayerController from '../../server/controllers/player_controller'
import { UUID } from 'crypto'
import Board from '../board/board'

export default class Square extends HTMLElement {
	square_id: string
	color: BlackOrWhite
	element: HTMLElement | null = null
	default_background: string

	board: Board

	constructor(color: BlackOrWhite, square_id: number, board: Board) {
		super()
		this.square_id = SquareID.pos_at_index(square_id)
		this.color = color
		this.default_background = color === BlackOrWhite.white ? '#D8ECEC' : '#1FE5DF'
		this.board = board
	}

	public async build_clickable_square() {
		await this.append_children()
		this.element = document.getElementById(`${this.square_id}`)
		this.add_event_listener()
	}

	private append_children(): Promise<void> {
		return new Promise(async (resolve) => {
			let div_node: Element = document.createElement('div')
			div_node.className = `${this.color}`
			div_node.id = `${this.square_id}`

			let p_node: Element = document.createElement('p')
			p_node.className = 'p'
			p_node.innerHTML = `${this.square_id}`

			div_node.appendChild(p_node)
			div_node.appendChild(this.piece_image())

			this.appendChild(div_node)
			resolve()
		})
	}

	private add_event_listener() {
		this.element?.addEventListener('click', this.handle_click.bind(this))
	}

	private handle_click() {
		this.board.move_controller.on_square_click(this)
	}

	private piece_image(): HTMLImageElement {
		let piece: Piece | undefined = this.piece_attached_to_square()
		if (piece != undefined) {
			piece.image.id = `${this.square_id}-image`
			return piece.image
		} 
		else return new Image()
	}

	public update_image(new_image: HTMLImageElement): void {
		this.element = document.getElementById(`${this.square_id}`)
		const image: HTMLElement | null = document.getElementById(`${this.square_id}-image`)
		if(image !== null) {
			if(this.element !== null) {
				this.element.removeChild(image)
				this.element.appendChild(new_image)
			}
		}
	}

	public is_empty(): boolean {
		return this.piece_attached_to_square() == undefined
	}

	public piece_attached_to_square(): Piece | undefined {
		const position: string = this.square_id as string
		return this.board.piece_list.piece_by_position(position)
	}

	public add_border(): void {
		if (this.element != undefined) {
			this.element.style.border = 'thick solid #0000FF'
		}
	}

	public remove_border(): void {
		if (this.element != undefined) {
			this.element.style.border = ''
		}
	}

	public add_dot(): void {
		const node = document.createElement('span')
		node.className = 'dot'
		node.id = `${this.square_id}-dot`
		if (this.element != undefined) {
			this.element!.appendChild(node)
		}
	}

	public remove_dot(): void {
		const node: HTMLElement | null = document.getElementById(`${this.square_id}-dot`)
		if (node !== null) {
			this.element!.removeChild(node)
		}
	}

	public add_check_border() {
		this.element = document.getElementById(`${this.square_id}`)

		if(!this.element) {
			throw new Error('Cannot add check color to undefined')
		}
		this.element.style.backgroundColor = 'red'
		if(GameController.game_type === GameType.online) {
			ClientWebSocket.send_message_to_server(new KingCheckStatusMessage(PlayerController.opponent_user_id as UUID, this, CheckStatus.in_check))
		}
	}

	public remove_check_border() {
		this.element = document.getElementById(`${this.square_id}`)

		if(!this.element) {
			throw new Error('Cannot add check color to undefined')
		}

		//TODO USE GLOBAL STYLES
		this.element.style.backgroundColor = this.default_background

		if(GameController.game_type === GameType.online) {
			ClientWebSocket.send_message_to_server(new KingCheckStatusMessage(PlayerController.opponent_user_id as UUID, this, CheckStatus.not_in_check))
		}
	}

	public remove_piece(): void {
		let piece: Piece | undefined = this.piece_attached_to_square()
		if (piece != undefined) {
			this.board.piece_list.remove_piece_by_id(piece.title)
		} 
	}
}

// Register the custom element
customElements.define('square-element', Square)
