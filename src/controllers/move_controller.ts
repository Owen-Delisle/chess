import type Square from '../components/square/square'
import type Piece from '../components/piece/piece'
import type { GridPoint } from '../global_types/grid_point'
import SquareGrid from '../models/square_grid'
import type King from '../components/piece/pieces/king'
import { PieceType } from '../components/piece/piece_types'
import type Rook from '../components/piece/pieces/rook'
import type { CastleVars } from '../components/piece/pieces/king'
import SquareID from '../components/square/square_id'
import Pawn from '../components/piece/pieces/pawn'
import ClientWebSocket from '../server/client_websocket'
import { Move } from '../global_types/move'
import MoveMessage from '../server/messages/move_message'
import { MessageTargetType } from '../server/types/message_target_type'
import PlayerController from './player_controller'
import GameType from '../global_types/enums/game_type'
import { CastleMove } from '../global_types/castle_move'
import CastleMoveMessage from '../server/messages/castle_move_message'
import { BlackOrWhite } from '../global_types/enums/black_or_white'
import { UUID } from 'crypto'
import { GameController } from './game_controller'
import EnPasssantMessage from 'src/server/messages/enpassant_message'

export default class MoveController {
	game_controller: GameController
	private focused_square: Square | undefined

	constructor(game_controller: GameController) {
		this.game_controller = game_controller
	}

	public on_square_click(clicked_square: Square): void {
		if (this.conditions_for_standard_move(clicked_square)) {
			this.clear_prev_focused_square()
			this.make_standard_move(clicked_square)
		} else if (this.conditions_for_castle(this.focused_square, clicked_square)) {
			this.clear_prev_focused_square()
			this.castle(clicked_square)
		} else {
			this.setup_values_for_move(clicked_square)
		}
	}

	private focused_square_is_defined(): boolean {
		return this.focused_square !== undefined
	}

	private conditions_for_standard_move(clicked_square: Square): boolean {
		let conditions_met: boolean = false

		if (this.focused_square_is_defined()) {
			if (!this.focused_square?.is_empty()) {
				if (
					this.focused_square
						?.piece_attached_to_square()
						?.possible_moves.includes(clicked_square.square_id)
				) {
					conditions_met = true
				}
			}
		}
		return conditions_met
	}

	private make_standard_move(clicked_square: Square): void {
		let piece_attached_to_focused_square: Piece | undefined =
			this.focused_square?.piece_attached_to_square()
		if (piece_attached_to_focused_square != undefined) {
			const move: Move = {
				piece: piece_attached_to_focused_square,
				from: this.focused_square!.square_id,
				to: clicked_square.square_id
			}
			this.move_piece_to(move, MoveInitiator.player)
		}
	}

	// Made public for testing
	public conditions_for_castle(focused_square: Square | undefined, clicked_square: Square): boolean {
		let should_castle: boolean = false
		let focused_piece: Piece | undefined = focused_square?.piece_attached_to_square()
		let clicked_piece: Piece | undefined = clicked_square?.piece_attached_to_square()

		if (focused_piece == undefined || clicked_piece == undefined) {
			should_castle = false
		} else if (focused_piece.type == PieceType.king && clicked_piece.type == PieceType.rook) {
			let king_piece: King = focused_piece as King
			let rook_piece: Rook = clicked_piece as Rook

			if (king_piece.color == rook_piece.color) {
				if (!king_piece.has_moved && !rook_piece.has_moved) {
					if (
						!king_piece.in_check &&
						!king_piece.kings_castle_squares_attacked(this.game_controller.piece_list, rook_piece)
					) {
						should_castle = true
					}
				}
			}
		}

		return should_castle
	}

	private castle(clicked_square: Square | undefined): void {
		const focused_piece: Piece = this.focused_square?.piece_attached_to_square()!
		const clicked_piece: Piece = clicked_square?.piece_attached_to_square()!

		const king_piece: King = focused_piece as King
		const rook_piece: Rook = clicked_piece as Rook

		const castle_vars: CastleVars = king_piece.castle_vars_for_rook_type(rook_piece.rook_type)

		if (king_piece.squares_between_king_and_rook_empty(this.game_controller.piece_list, rook_piece)) {
			const king_gp: GridPoint = SquareGrid.point_at_board_position(king_piece.pos)
			const rook_gp: GridPoint = SquareGrid.point_at_board_position(rook_piece.pos)
			const next_king_point: GridPoint = {
				row: king_gp.row,
				col: king_gp.col + castle_vars.king_col_modifier,
			}
			const next_rook_point: GridPoint = {
				row: rook_gp.row,
				col: rook_gp.col + castle_vars.rook_col_modifier,
			}

			king_piece.possible_moves.push(SquareID.pos_at_point(next_king_point))
			rook_piece.possible_moves.push(SquareID.pos_at_point(next_rook_point))

			const new_king_pos = SquareID.pos_at_point(next_king_point)
			const new_rook_pos = SquareID.pos_at_point(next_rook_point)

			const king_move: Move = {
				piece: king_piece,
				from: king_piece.pos,
				to: new_king_pos
			}

			const rook_move: Move = {
				piece: rook_piece,
				from: rook_piece.pos,
				to: new_rook_pos
			}

			const castle_move: CastleMove = {
				king_move: king_move,
				rook_move: rook_move
			}

			this.move_castle_pieces(castle_move, MoveInitiator.player)
		}
	}

	private clear_prev_focused_square() {
		this.focused_square!.remove_border()
		if (this.focused_square!.piece_attached_to_square() != undefined) {
			this.remove_visuals_from_possible_moves(
				this.focused_square!.piece_attached_to_square()!,
			)
		}
	}

	private setup_values_for_move(clicked_square: Square): void {
		if (this.conditions_to_setup_values(clicked_square)) {
			if(this.focused_square !== clicked_square) {
				this.clear_focused_square_visuals()
				this.focused_square = clicked_square
				this.focused_square.add_border()
				this.add_visuals_to_possible_moves_for(this.focused_square.piece_attached_to_square())
			} else {
				this.remove_visuals_from_possible_moves(this.focused_square.piece_attached_to_square())
				this.focused_square.remove_border()
				this.focused_square = undefined
			}
		}
	}

	private conditions_to_setup_values(clicked_square: Square): boolean | undefined {
		if(clicked_square.is_empty()) {
			return false
		}

		const piece_attached_to_square = clicked_square.piece_attached_to_square()
		if(!piece_attached_to_square) {
			throw new Error("Piece Attached to Square is undefined")
		}

		if(this.game_controller.game_type === GameType.online) {
			if(piece_attached_to_square.color !== PlayerController.player_color ) {
				return false
			}
			if(PlayerController.player_color !== this.game_controller.turn) {
				return false
			}
			return true
		}

		if(this.game_controller.game_type === GameType.offline) {
			return (piece_attached_to_square.color === this.game_controller.turn)
		}
	}

	private clear_focused_square_visuals() {
		if (this.focused_square != undefined) {
			this.focused_square.remove_border()
			if (this.focused_square.piece_attached_to_square() != undefined) {
				this.remove_visuals_from_possible_moves(
					this.focused_square.piece_attached_to_square()!,
				)
			}
		}
	}

	public load_possible_moves_lists(): void {
		this.game_controller.piece_list.clear_position_restrictions_property()

		let king_color: BlackOrWhite = this.game_controller.turn
		if(this.game_controller.game_type === GameType.online) {
			king_color = PlayerController.player_color
		}

		const king_of_color: King = this.game_controller.piece_list.king_by_color(king_color)
		king_of_color.render_legal_squares_surrounding_king(this.game_controller.piece_list)
		king_of_color.render_check_paths_list()

		this.game_controller.piece_list.list.forEach((piece) => {
			if (piece !== undefined) {
				piece.calculate_possible_moves()
				if (piece.type === PieceType.pawn) {
					const pawn: Pawn = piece as Pawn
					pawn.build_possible_attack_list(this.game_controller.move_list.last_move())
				}
			}
		})

		this.game_controller.should_game_end(king_of_color)
	}

	public clear_possible_moves_lists(): void {
		this.game_controller.piece_list.list.forEach((piece) => {
			if (piece != undefined) {
				piece.possible_moves = []
			}
		})
	}

	private add_visuals_to_possible_moves_for(piece: Piece | undefined): void {
		if (piece !== undefined) {
			this.add_dots_to_possible_moves_for(piece)
			this.add_border_to_attacked_piece_for(piece)
			if (piece.type === PieceType.king) {
				const king: King = piece as King
				king.add_borders_to_castleable_rooks(this.game_controller.piece_list, king.rooks_for_king(this.game_controller.piece_list))
			}
		}
	}

	private add_dots_to_possible_moves_for(piece: Piece | undefined): void {
		piece!.possible_moves.forEach((possible_move) => {
			let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
			if (square != undefined) {
				if (square.piece_attached_to_square() == undefined) {
					square.add_dot()
				}
			}
		})
	}

	private add_border_to_attacked_piece_for(piece: Piece | undefined): void {
		piece!.possible_moves.forEach((position) => {
			const piece_at_position = this.game_controller.piece_list.piece_by_position(position)
			if (piece_at_position !== undefined) {
				if (piece!.color !== piece_at_position.color) {
					SquareGrid.square_by_board_position(position)!.add_border()
				}
			}
		})
	}

	private remove_visuals_from_possible_moves(piece: Piece | undefined): void {
		if(piece === undefined) {
			throw Error("Piece is undefined")
		} 
		piece.possible_moves.forEach((possible_move) => {
			let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
			if (square != undefined) {
				square.remove_dot()
				square.remove_border()
			}
		})
	}

	public async move_piece_to(move: Move, mover: MoveInitiator): Promise<void> {
		const new_square = SquareGrid.square_by_board_position(move.to)

		if(!new_square) {
			throw new Error("New Square Not Found in Move Piece To")
		}
		if (this.remove_piece_conditions(move.to)) {
			new_square.remove_piece()
		}

		this.game_controller.add_move_to_list(move)
		this.handle_move(mover, move)
	}

	private handle_move(mover: MoveInitiator, move: Move) {
		if(mover === MoveInitiator.server) {
			this.move_sent_from_server(move)
		} else if(mover === MoveInitiator.player) {
			this.handle_player_move(move)	
		}

		if(move.piece.type === PieceType.pawn) {
			this.attempt_pawn_promotion(move)
			this.attempt_en_passant(move)
		}
		this.redraw()
	}

	private attempt_pawn_promotion(move: Move) {
		const pawn: Pawn = move.piece as Pawn
		const next_row: number = SquareGrid.point_at_board_position(move.to).row
		if (next_row === 0 || next_row === 7) {
			this.game_controller.piece_list.swap_with_queen(move.to, pawn.color)
		}
	}

	private attempt_en_passant(move: Move) {
		const pawn: Pawn = move.piece as Pawn
		if(pawn.en_passant_position === move.to) {
			if(this.game_controller.game_type === GameType.online) {
				const point: GridPoint = SquareGrid.point_at_board_position(move.to)
				const pawn_to_take_pos: string = SquareID.pos_at_point({row: point.row+1, col: point.col})
				ClientWebSocket.send_message_to_server(
					new EnPasssantMessage(PlayerController.opponent_user_id, pawn_to_take_pos)
					)
			}
		}
	}

	private async handle_player_move(move: Move) {
		await move.piece.move_to(move.to)

		if(this.game_controller.game_type === GameType.online) {
			this.send_move_to_server(move)
		}
	}

	private send_move_to_server(move: Move) {
		const message = new MoveMessage(
			MessageTargetType.direct, 
			PlayerController.opponent_user_id as UUID, 
			move)

		ClientWebSocket.send_message_to_server(message)
	}

	private move_sent_from_server(move: Move) {
		const piece = this.game_controller.piece_list.piece_by_id(move.piece.title)
		if(!piece) {
			throw new Error("Piece is not defined")
		}
		piece.move_to(move.to)
	}

	private remove_piece_conditions(selected_pos: string): boolean {
		const new_square: Square | undefined = SquareGrid.square_by_board_position(selected_pos)

		if(!new_square) {
			throw new Error("Square not found in Remove Piece Conditions")
		}

		let should_remove_piece: boolean = false
		if (!new_square.is_empty()) {
			if (new_square.piece_attached_to_square()!.color !== this.game_controller.turn) {
				should_remove_piece = true
			}
		}
		return should_remove_piece
	}

	public async move_castle_pieces(castle_move: CastleMove, mover: MoveInitiator) {
		const king_piece: Piece | undefined = this.game_controller.piece_list.piece_by_id(castle_move.king_move.piece.title)
		const rook_piece: Piece | undefined = this.game_controller.piece_list.piece_by_id(castle_move.rook_move.piece.title)

		if(!king_piece || !rook_piece) {
			throw new Error("Couldnt find king or rook piece in piece list")
		}

		await king_piece.move_to(castle_move.king_move.to)
		await rook_piece.move_to(castle_move.rook_move.to)

		if(mover === MoveInitiator.player && this.game_controller.game_type === GameType.online) {
			this.send_castle_move_to_server(castle_move)
		}

		this.redraw()
	}

	private send_castle_move_to_server(castle_move: CastleMove) {
		const message = new CastleMoveMessage(
			MessageTargetType.direct, 
			PlayerController.opponent_user_id as UUID,
			castle_move)

		ClientWebSocket.send_message_to_server(message)
	}

	private async redraw(): Promise<void> {
		this.focused_square = undefined
		this.game_controller.switch_turn()
	}
}

export enum MoveInitiator {
	player,
	server
}
