import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"
import Index from "../index"
import type King from "../components/piece/pieces/king"
import { PieceType } from "../components/piece/piece_types"
import type Rook from "../components/piece/pieces/rook"
import { RookType } from "../components/piece/pieces/rook"

export default class MoveController {
    private static focused_square: Square | undefined
    private static possible_moves: GridPoint[] = []

    public static on_square_click(clicked_square: Square) {
        if(this.can_make_move_now()) {
            if (this.should_move_piece_at(clicked_square)) {
                this.move_piece_to(clicked_square, this.focused_square!.piece!)
            }
            
            if (this.should_play_castle(clicked_square)) {
                this.castle(clicked_square)
            }   
        }
        this.assign_values_to_movement_variables(clicked_square)
    }

    private static should_move_piece_at(clicked_square: Square): boolean {
        return !this.clicked_square_contains_piece(clicked_square) && !this.should_castle(clicked_square)
    }

    private static should_play_castle(clicked_square: Square): boolean {
        return this.should_castle(clicked_square)
    }

    private static can_make_move_now(): boolean {
        return this.focused_square !== undefined
    }

    private static assign_values_to_movement_variables(clicked_square: Square) {
        if (this.clicked_square_contains_piece(clicked_square)) {
            this.focused_square = clicked_square
            clicked_square.add_border()
            this.load_possible_moves_list(clicked_square)
        }
    }

    private static clicked_square_contains_piece(clicked_square: Square): boolean {
        return clicked_square.piece !== undefined
    }

    private static should_castle(clicked_square: Square | undefined): boolean {
        let should_castle: boolean = false
        let focused_piece: Piece | undefined = this.focused_square?.piece
        let new_piece: Piece | undefined = clicked_square?.piece

        if (focused_piece == undefined || new_piece == undefined) {
            should_castle = false
        } else if (focused_piece.type == PieceType.king && new_piece.type == PieceType.rook) {
            let king_piece: King = focused_piece as King
            let rook_piece: Rook = new_piece as Rook

            if(!king_piece.has_moved && !rook_piece.has_moved) {
                should_castle = true
            }
        }

        return should_castle
    }

    private static castle(clicked_square: Square | undefined): void {
        let focused_piece: Piece = this.focused_square?.piece!
        let new_piece: Piece = clicked_square?.piece!

        let king_piece: King = focused_piece as King
        let rook_piece: Rook = new_piece as Rook

        let number_of_squares_between_king_and_rook: number
        let king_col_modifier: number
        let rook_col_modifier: number
        let index_modifier: number

        switch (rook_piece.rook_type) {
            case RookType.long_rook:
                king_col_modifier = -2
                rook_col_modifier = 3
                number_of_squares_between_king_and_rook = 3
                index_modifier = -1
                break;
            case RookType.short_rook:
                king_col_modifier = 2
                rook_col_modifier = -2
                number_of_squares_between_king_and_rook = 2
                index_modifier = 1
                break;
        }

        for (let index = 1; index <= number_of_squares_between_king_and_rook; index++) {
            let point: GridPoint = { row: king_piece.grid_point!.row, col: king_piece.grid_point!.col + (index*index_modifier) }
            if (SquareGrid.piece_by_grid_point(point) != undefined) {
                return
            }
        }

        let next_king_point: GridPoint = { row: king_piece.grid_point!.row, col: king_piece.grid_point!.col + (king_col_modifier) }
        let next_rook_point: GridPoint = { row: rook_piece.grid_point!.row, col: rook_piece.grid_point!.col + (rook_col_modifier) }
        this.possible_moves.push(next_king_point)
        this.possible_moves.push(next_rook_point)

        this.move_piece_to(SquareGrid.square_by_grid_point(next_king_point), king_piece)
        this.move_piece_to(SquareGrid.square_by_grid_point(next_rook_point), rook_piece)

        clicked_square!.piece = undefined
        this.focused_square = undefined
    }

    private static load_possible_moves_list(square: Square): void {
        let typed_piece = Piece.piece_factory(square.piece!)
        this.possible_moves = typed_piece.calculate_possible_moves()

        this.add_dots_to_possible_moves()
    }

    private static add_dots_to_possible_moves() {
        this.possible_moves.forEach(possible_move => {
            SquareGrid.square_by_grid_point(possible_move).add_dot()
        })
    }

    private static remove_dots_from_possible_moves() {
        this.possible_moves.forEach(possible_move => {
            SquareGrid.square_by_grid_point(possible_move).remove_dot()
        })
    }

    private static move_piece_to(selected_square: Square, piece: Piece) {
        if (this.piece_can_move_to(selected_square)) {
            piece?.move_to(selected_square)
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
}
