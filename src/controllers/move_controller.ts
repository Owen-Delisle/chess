import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"
import Index from "../index"
import type King from "../components/piece/pieces/king"
import { PieceType } from "../components/piece/piece_types"
import type Rook from "../components/piece/pieces/rook"
import type { CastleVars } from "../components/piece/pieces/king"

export default class MoveController {
    private static focused_square: Square | undefined
    private static possible_moves: GridPoint[] = []

    public static on_square_click(clicked_square: Square): void {
        if (this.focused_square_is_defined()) {
            if (this.can_move_piece_to(clicked_square)) {
                this.move_piece_to(clicked_square, this.focused_square!.piece!)
            }

            if (this.can_initiate_castle(clicked_square)) {
                this.castle(clicked_square)
            }
        }
        this.assign_values_to_movement_variables(clicked_square)
    }

    private static can_move_piece_to(clicked_square: Square): boolean {
        return (!this.piece_exists_at(clicked_square) || clicked_square.piece!.color != this.focused_square?.piece!.color)
            &&
            !this.can_initiate_castle(clicked_square)
    }

    private static focused_square_is_defined(): boolean {
        return this.focused_square !== undefined
    }

    private static can_initiate_castle(clicked_square: Square | undefined): boolean {
        let should_castle: boolean = false
        let focused_piece: Piece | undefined = this.focused_square?.piece
        let clicked_piece: Piece | undefined = clicked_square?.piece

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
            this.clear_square_visuals()
            this.focused_square = clicked_square
            this.focused_square.add_border()
            this.load_possible_moves_list(this.focused_square)
        }
    }

    private static clear_square_visuals() {
        if (this.focused_square != undefined) {
            this.focused_square.remove_border()
        }
        this.remove_visuals_from_possible_moves()
    }

    private static piece_exists_at(clicked_square: Square): boolean {
        return clicked_square.piece !== undefined
    }

    private static castle(clicked_square: Square | undefined): void {
        let focused_piece: Piece = this.focused_square?.piece!
        let clicked_piece: Piece = clicked_square?.piece!

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
            this.possible_moves.push(next_king_point)
            this.possible_moves.push(next_rook_point)

            this.move_piece_to(SquareGrid.square_by_grid_point(next_king_point), king_piece)
            this.move_piece_to(SquareGrid.square_by_grid_point(next_rook_point), rook_piece)

            clicked_square!.piece = undefined
            this.focused_square = undefined
        }
    }

    private static load_possible_moves_list(square: Square): void {
        let typed_piece = Piece.piece_factory(square.piece!)
        this.possible_moves = typed_piece.calculate_possible_moves()

        this.add_dots_to_possible_moves()
    }

    private static add_dots_to_possible_moves(): void {
        this.possible_moves.forEach(possible_move => {
            let square: Square = SquareGrid.square_by_grid_point(possible_move)
            if (square.piece == undefined) {
                square.add_dot()
            }
        })
    }

    private static remove_visuals_from_possible_moves(): void {
        this.possible_moves.forEach(possible_move => {
            SquareGrid.square_by_grid_point(possible_move).remove_dot()
            // SquareGrid.square_by_grid_point(possible_move).remove_border()
        })
    }

    private static move_piece_to(selected_square: Square, piece: Piece): void {
        if (this.piece_can_move_to(selected_square) && piece != undefined) {
            piece.move_to(selected_square)
        }
        if(selected_square.piece != undefined) {
            // selected_square.remove_piece()
        }
        Index.board.redraw()
    }

    private static piece_can_move_to(selected_square: Square): boolean {
        let should_move: boolean = false
        this.possible_moves.forEach(possible_point => {
            if (
                possible_point.row == selected_square.grid_point.row &&
                possible_point.col == selected_square.grid_point.col
            ) {
                should_move = true
            }
        })
        return should_move
    }

    public static reset_possible_moves(): void {
        this.possible_moves = []
    }
}
