import type Square from '../components/square/square'
import type Piece from '../components/piece/piece'
import type { GridPoint } from '../global_types/grid_point'
import SquareGrid from '../models/square_grid'
import type King from '../components/piece/pieces/king'
import { PieceType } from '../components/piece/piece_types'
import type Rook from '../components/piece/pieces/rook'
import type { CastleVars } from '../components/piece/pieces/king'
import SquareID from '../components/square/square_id'
import { GameController } from './game_controller'
import PieceList from '../models/piece_list'
import type Pawn from '../components/piece/pieces/pawn'
import ClientWebSocket from '../server/client_websocket'
import { Move } from '../global_types/move'
import MoveMessage from '../server/messages/move_message'
import Board from '../components/board/board'
import { MessageTargetType } from '../server/types/message_target_type'
import PlayerController from '../server/controllers/player_controller'
import GameType from '../global_types/enums/game_type'
import { CastleMove } from '../global_types/castle_move'
import CastleMoveMessage from '../server/messages/castle_move_message'
import { BlackOrWhite } from '../global_types/enums/black_or_white'

export default class MoveController {
	private static focused_square: Square | undefined

	public static on_square_click(clicked_square: Square): void {
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

	private static focused_square_is_defined(): boolean {
		return this.focused_square !== undefined
	}

	private static conditions_for_standard_move(clicked_square: Square): boolean {
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

	private static make_standard_move(clicked_square: Square): void {
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
	public static conditions_for_castle(focused_square: Square | undefined, clicked_square: Square): boolean {
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
						!king_piece.kings_castle_squares_attacked(rook_piece)
					) {
						should_castle = true
					}
				}
			}
		}

		return should_castle
	}

	private static castle(clicked_square: Square | undefined): void {
		const focused_piece: Piece = this.focused_square?.piece_attached_to_square()!
		const clicked_piece: Piece = clicked_square?.piece_attached_to_square()!

		const king_piece: King = focused_piece as King
		const rook_piece: Rook = clicked_piece as Rook

		const castle_vars: CastleVars = king_piece.castle_vars_for_rook_type(rook_piece.rook_type)

		if (king_piece.squares_between_king_and_rook_empty(rook_piece)) {
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

	private static clear_prev_focused_square() {
		this.focused_square!.remove_border()
		if (this.focused_square!.piece_attached_to_square() != undefined) {
			this.remove_visuals_from_possible_moves(
				this.focused_square!.piece_attached_to_square()!,
			)
		}
	}

	private static setup_values_for_move(clicked_square: Square): void {
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

	private static conditions_to_setup_values(clicked_square: Square): boolean {
		return (
			!clicked_square.is_empty() &&
			clicked_square.piece_attached_to_square()!.color == GameController.turn
		)
	}

	private static clear_focused_square_visuals() {
		if (this.focused_square != undefined) {
			this.focused_square.remove_border()
			if (this.focused_square.piece_attached_to_square() != undefined) {
				this.remove_visuals_from_possible_moves(
					this.focused_square.piece_attached_to_square()!,
				)
			}
		}
	}

	public static load_possible_moves_lists(): void {
		PieceList.clear_position_restrictions_property()

		let king_color: BlackOrWhite = GameController.turn
		if(GameController.game_type === GameType.online) {
			king_color = PlayerController.player_color
		}

		const king_of_color: King = PieceList.king_by_color(king_color)
		king_of_color.render_legal_squares_surrounding_king()
		king_of_color.render_check_paths_list()

		PieceList.piece_list.forEach((piece) => {
			if (piece !== undefined) {
				piece.calculate_possible_moves()
				if (piece.type === PieceType.pawn) {
					const pawn: Pawn = piece as Pawn
					pawn.build_possible_attack_list()
				}
			}
		})

		GameController.should_game_end(king_of_color)
	}

	public static clear_possible_moves_lists(): void {
		PieceList.piece_list.forEach((piece) => {
			if (piece != undefined) {
				piece.possible_moves = []
			}
		})
	}

	private static add_visuals_to_possible_moves_for(piece: Piece | undefined): void {
		if (piece !== undefined) {
			this.add_dots_to_possible_moves_for(piece)
			this.add_border_to_attacked_piece_for(piece)
			if (piece.type === PieceType.king) {
				const king: King = piece as King
				king.add_borders_to_castleable_rooks(king.rooks_for_king())
			}
		}
	}

	private static add_dots_to_possible_moves_for(piece: Piece | undefined): void {
		piece!.possible_moves.forEach((possible_move) => {
			let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
			if (square != undefined) {
				if (square.piece_attached_to_square() == undefined) {
					square.add_dot()
				}
			}
		})
	}

	private static add_border_to_attacked_piece_for(piece: Piece | undefined): void {
		piece!.possible_moves.forEach((position) => {
			const piece_at_position = PieceList.piece_by_position(position)
			if (piece_at_position !== undefined) {
				if (piece!.color !== piece_at_position.color) {
					SquareGrid.square_by_board_position(position)!.add_border()
				}
			}
		})
	}

	private static remove_visuals_from_possible_moves(piece: Piece | undefined): void {
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

	public static async move_piece_to(move: Move, mover: MoveInitiator): Promise<void> {
		const new_square = SquareGrid.square_by_board_position(move.to)

		if(!new_square) {
			throw new Error("New Square Not Found in Move Piece To")
		}
		if (this.remove_piece_conditions(move.to)) {
			new_square.remove_piece()
		}

		GameController.add_move_to_list(move)

		this.handle_move(mover, move)

		this.redraw()
	}

	private static handle_move(mover: MoveInitiator, move: Move) {
		if(mover === MoveInitiator.server) {
			this.move_sent_from_server(move)
		} else if(mover === MoveInitiator.player) {
			this.handle_player_move(move)	
		}
	}

	private static handle_player_move(move: Move) {
		if(GameController.game_type === GameType.online) {
			this.online_player_move(move)
		} else if(GameController.game_type === GameType.offline) {
			this.offline_player_move(move)
		}
	}

	private static async offline_player_move(move: Move) {
		await move.piece.move_to(move.to)
	}

	private static async online_player_move(move: Move) {
		this.send_move_to_server(move)
		await move.piece.move_to(move.to)
	}

	private static send_move_to_server(move: Move) {
		const message = new MoveMessage(
			MessageTargetType.direct, 
			PlayerController.opponent_user_id, 
			move)

		ClientWebSocket.send_message_to_server(message)
	}

	private static move_sent_from_server(move: Move) {
		const piece = PieceList.piece_by_id(move.piece.title)
		if(!piece) {
			throw new Error("Piece is not defined")
		}
		piece.move_to(move.to)
	}

	private static remove_piece_conditions(selected_pos: string): boolean {
		const new_square: Square | undefined = SquareGrid.square_by_board_position(selected_pos)

		if(!new_square) {
			throw new Error("Square not found in Remove Piece Conditions")
		}

		let should_remove_piece: boolean = false
		if (!new_square.is_empty()) {
			if (new_square.piece_attached_to_square()!.color !== GameController.turn) {
				should_remove_piece = true
			}
		}
		return should_remove_piece
	}

	public static async move_castle_pieces(castle_move: CastleMove, mover: MoveInitiator) {
		const king_piece: Piece | undefined = PieceList.piece_by_id(castle_move.king_move.piece.title)
		const rook_piece: Piece | undefined = PieceList.piece_by_id(castle_move.rook_move.piece.title)

		if(!king_piece || !rook_piece) {
			throw new Error("Couldnt find king or rook piece in piece list")
		}

		await king_piece.move_to(castle_move.king_move.to)
		await rook_piece.move_to(castle_move.rook_move.to)

		if(mover === MoveInitiator.player && GameController.game_type === GameType.online) {
			this.send_castle_move_to_server(castle_move)
		}

		this.redraw()
	}

	private static send_castle_move_to_server(castle_move: CastleMove) {
		const message = new CastleMoveMessage(
			MessageTargetType.direct, 
			PlayerController.opponent_user_id,
			castle_move)

		ClientWebSocket.send_message_to_server(message)
	}

	private static async redraw(): Promise<void> {
		this.focused_square = undefined
		GameController.switch_turn()
		Board.singleton.redraw()
	}
}

export enum MoveInitiator {
	player,
	server
}
