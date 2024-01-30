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

export default class MoveController {
    private static focused_square: Square | undefined

    public static on_square_click(clicked_square: Square): void {
        let piece_attached_to_focused_square: Piece | undefined
        piece_attached_to_focused_square = this.focused_square?.piece_attached_to_square()
        
        if (this.focused_square_is_defined()) {
            if (this.can_move_piece_to(clicked_square)) {
                this.move_piece_to(clicked_square, piece_attached_to_focused_square!)
            }

            if (this.can_initiate_castle(clicked_square)) {
                this.castle(clicked_square)
            }
        }
        this.assign_values_to_movement_variables(clicked_square)
    }

    private static can_move_piece_to(clicked_square: Square): boolean {
        let piece_attached_to_click: Piece | undefined
        piece_attached_to_click = clicked_square.piece_attached_to_square()

        let piece_attached_to_focused: Piece | undefined
        piece_attached_to_focused = this.focused_square?.piece_attached_to_square()

        return (!this.piece_exists_at(clicked_square) || piece_attached_to_click!.color != piece_attached_to_focused!.color)
            &&
            !this.can_initiate_castle(clicked_square)
    }

    private static focused_square_is_defined(): boolean {
        return this.focused_square !== undefined
    }

    private static can_initiate_castle(clicked_square: Square | undefined): boolean {
        let should_castle: boolean = false
        let focused_piece: Piece | undefined = this.focused_square?.piece_attached_to_square()
        let clicked_piece: Piece | undefined = clicked_square?.piece_attached_to_square()

        if (focused_piece == undefined || clicked_piece == undefined) {
            should_castle = false
        } else if (focused_piece.type == PieceType.king && clicked_piece.type == PieceType.rook) {
            let king_piece: King = focused_piece as King
            let rook_piece: Rook = clicked_piece as Rook

            if (!king_piece.has_moved && !rook_piece.has_moved) {
                should_castle = true
            }
        }

        return should_castle
    }

    private static assign_values_to_movement_variables(clicked_square: Square): void {
        if (this.piece_exists_at(clicked_square)) {
            this.clear_square_visuals(clicked_square.piece_attached_to_square()!)
            this.focused_square = clicked_square
            this.focused_square.add_border()
            this.load_possible_moves_list(this.focused_square)
        }
    }

    private static clear_square_visuals(piece: Piece) {
        if (this.focused_square != undefined) {
            this.focused_square.remove_border()
        }
        this.remove_visuals_from_possible_moves(piece)
    }

    private static piece_exists_at(clicked_square: Square): boolean {
        return clicked_square.piece_attached_to_square() !== undefined
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

            this.move_piece_to(SquareGrid.square_by_grid_point(next_rook_point), rook_piece)
            this.move_piece_to(SquareGrid.square_by_grid_point(next_king_point), king_piece)

            this.focused_square = undefined
        }
    }

    private static load_possible_moves_list(square: Square): void {
        let piece_attached_to_square: Piece | undefined
        piece_attached_to_square = square.piece_attached_to_square()

        if(piece_attached_to_square != undefined) {
            const typed_piece = Piece.piece_factory(piece_attached_to_square)
            typed_piece.calculate_possible_moves()
            this.add_dots_to_possible_moves(typed_piece)
        }
    }

    private static add_dots_to_possible_moves(piece: Piece): void {
        piece.possible_moves.forEach(possible_move => {
            let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
            if(square != undefined) {
                if (square.piece_attached_to_square() == undefined) {
                    square.add_dot()
                }
            }
        })
    }

    private static remove_visuals_from_possible_moves(piece: Piece): void {
        piece.possible_moves.forEach(possible_move => {
            let square: Square | undefined = SquareGrid.square_by_board_position(possible_move)
            if(square != undefined) {
                square.remove_dot()
                square.remove_border()
            }
        })
    }

    private static async move_piece_to(selected_square: Square, piece: Piece): Promise<void> {
        if(selected_square.piece_attached_to_square() != undefined && selected_square.piece_attached_to_square()!.color != this.focused_square!.piece_attached_to_square()!.color) {
            selected_square.remove_piece()
        }
        
        if (this.piece_can_move_to(selected_square) && piece != undefined) {
            await piece.move_to(selected_square)
        }

        GameController.switch_turn()
        Index.board.redraw()
    }

    private static piece_can_move_to(selected_square: Square): boolean {
        let should_move: boolean = false

        if(this.focused_square?.piece_attached_to_square() == undefined) return false

        this.focused_square?.piece_attached_to_square()!.possible_moves.forEach(move => {
            if (move == selected_square.square_id) {
                should_move = true
            }
        })
        return should_move
    }
    
}
