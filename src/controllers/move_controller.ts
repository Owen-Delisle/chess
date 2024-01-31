import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"
import Index from "../index"
import type King from "../components/piece/pieces/king"
import { PieceType } from "../components/piece/piece_types"
import type Rook from "../components/piece/pieces/rook"
import type { CastleVars } from "../components/piece/pieces/king"
import SquareID from "../components/square/square_id"
import { GameController } from "./game_controller"
import PieceList from "../components/piece/piece_list"
import { not_color } from "../components/piece/color"

export default class MoveController {
    private static focused_square: Square | undefined

    public static on_square_click(clicked_square: Square): void {
        if (this.conditions_for_standard_move(clicked_square)) {
            this.clear_prev_focused_square()
            this.make_standard_move(clicked_square)
        } else if (this.conditions_for_castle(clicked_square)) {
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
                if (this.focused_square?.piece_attached_to_square()?.possible_moves.includes(clicked_square.square_id)) {
                    conditions_met = true
                }
            }
        }
        return conditions_met
    }

    private static make_standard_move(clicked_square: Square): void {
        let piece_attached_to_focused_square: Piece | undefined = this.focused_square?.piece_attached_to_square()
        if(piece_attached_to_focused_square != undefined) {
            this.move_piece_to(clicked_square, piece_attached_to_focused_square)
        }
    }

    private static conditions_for_castle(clicked_square: Square): boolean {
        let should_castle: boolean = false
        let focused_piece: Piece | undefined = this.focused_square?.piece_attached_to_square()
        let clicked_piece: Piece | undefined = clicked_square?.piece_attached_to_square()

        if (focused_piece == undefined || clicked_piece == undefined) {
            should_castle = false
        } else if (focused_piece.type == PieceType.king && clicked_piece.type == PieceType.rook) {
            let king_piece: King = focused_piece as King
            let rook_piece: Rook = clicked_piece as Rook

            if (king_piece.color == rook_piece.color) {
                if (!king_piece.has_moved && !rook_piece.has_moved) {
                    should_castle = true
                }
            }
        }

        return should_castle
    }

    private static castle(clicked_square: Square | undefined): void {
        let focused_piece: Piece = this.focused_square?.piece_attached_to_square()!
        let clicked_piece: Piece = clicked_square?.piece_attached_to_square()!

        let king_piece: King = focused_piece as King
        let rook_piece: Rook = clicked_piece as Rook

        let castle_vars: CastleVars = king_piece.castle_vars_for_rook_type(rook_piece.rook_type)

        if (king_piece.squares_between_king_and_rook_empty(rook_piece)) {
            let next_king_point: GridPoint = {
                row: king_piece.grid_point!.row,
                col: king_piece.grid_point!.col + (castle_vars.king_col_modifier)
            }
            let next_rook_point: GridPoint = {
                row: rook_piece.grid_point!.row,
                col: rook_piece.grid_point!.col + (castle_vars.rook_col_modifier)
            }

            king_piece.possible_moves.push(SquareID.pos_at_point(next_king_point))
            rook_piece.possible_moves.push(SquareID.pos_at_point(next_rook_point))

            let new_king_square = SquareGrid.square_by_grid_point(next_king_point)
            let new_rook_square = SquareGrid.square_by_grid_point(next_rook_point)

            this.move_castle_pieces(new_king_square, king_piece, new_rook_square, rook_piece)
        }
    }

    private static clear_prev_focused_square() {
        this.focused_square!.remove_border()
        if (this.focused_square!.piece_attached_to_square() != undefined) {
            this.remove_visuals_from_possible_moves(this.focused_square!.piece_attached_to_square()!)
        }
    }

    private static setup_values_for_move(clicked_square: Square): void {
        if (this.conditions_to_setup_values(clicked_square)) {
            this.clear_focused_square_visuals()
            this.focused_square = clicked_square
            this.focused_square.add_border()
            this.load_possible_moves_list_for(this.focused_square.piece_attached_to_square())
            this.add_dots_to_possible_moves_for(this.focused_square.piece_attached_to_square())
        }
    }

    private static conditions_to_setup_values(clicked_square: Square): boolean {
        return !clicked_square.is_empty() && clicked_square.piece_attached_to_square()!.color == GameController.turn
    }

    private static clear_focused_square_visuals() {
        if (this.focused_square != undefined) {
            this.focused_square.remove_border()
            if (this.focused_square.piece_attached_to_square() != undefined) {
                this.remove_visuals_from_possible_moves(this.focused_square.piece_attached_to_square()!)
            }
        }
    }

    private static load_possible_moves_list_for(piece: Piece | undefined): void {
        if (piece != undefined) {
            const typed_piece = Piece.piece_factory(piece)
            typed_piece.calculate_possible_moves()
        }
    }

    private static add_dots_to_possible_moves_for(piece: Piece | undefined): void {
        if(piece != undefined) {
            piece.possible_moves.forEach(possible_move => {
                let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
                if (square != undefined) {
                    if (square.piece_attached_to_square() == undefined) {
                        square.add_dot()
                    }
                }
            })
        }
    }

    private static remove_visuals_from_possible_moves(piece: Piece): void {
        piece.possible_moves.forEach(possible_move => {
            let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
            if (square != undefined) {
                square.remove_dot()
                square.remove_border()
            }
        })
    }

    private static async move_piece_to(selected_square: Square, piece: Piece): Promise<void> {
        if (this.remove_piece_conditions(selected_square)) {
            selected_square.remove_piece()
        }

        await piece.move_to(selected_square)

        this.redraw()
    }

    private static remove_piece_conditions(selected_square: Square): boolean {
        let should_remove_piece: boolean = false
        if(!selected_square.is_empty()) {
            if(selected_square.piece_attached_to_square()!.color != GameController.turn) {
                should_remove_piece = true
            }
        }
        return should_remove_piece
    }
    
    private static async move_castle_pieces(new_king_square: Square, king_piece: Piece, new_rook_square: Square, rook_piece: Piece): Promise<void> {
        await king_piece.move_to(new_king_square)
        await rook_piece.move_to(new_rook_square)
        this.redraw()
    }

    private static redraw(): void {
        this.focused_square = undefined
        GameController.switch_turn()
        Index.board.redraw()
    }
}
