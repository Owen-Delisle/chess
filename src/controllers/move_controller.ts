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

    public static on_square_click(new_square: Square) {
        if (this.already_has_piece_focused()) {
            if (this.should_castle(this.focused_square, new_square)) {
                this.castle(this.focused_square, new_square)
            }
            this.clear_visuals()
        }
        if (this.new_square_contains_piece(new_square)) {
            this.focused_square = new_square
            new_square.add_border()
            this.load_possible_moves_list(new_square)
        } else if (this.already_has_piece_focused()) {
            this.move_focused_piece_to(new_square)
        }
    }

    private static already_has_piece_focused(): boolean {
        return this.focused_square !== undefined
    }

    private static new_square_contains_piece(new_square: Square): boolean {
        return new_square.piece !== undefined
    }

    private static should_castle(focused_square: Square | undefined, new_square: Square | undefined): boolean {
        let should_castle: boolean = false
        let focused_piece: Piece | undefined = focused_square?.piece
        let new_piece: Piece | undefined = new_square?.piece

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

    private static castle(focused_square: Square | undefined, new_square: Square | undefined): void {
        let focused_piece: Piece = focused_square?.piece!
        let new_piece: Piece = new_square?.piece!

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

        this.move_piece_to(king_piece, SquareGrid.square_by_grid_point(next_king_point))
        this.move_piece_to(rook_piece, SquareGrid.square_by_grid_point(next_rook_point))

        new_square!.piece = undefined
        this.focused_square = undefined
    }

    private static clear_visuals(): void {
        this.focused_square?.remove_border()
        this.remove_dots_from_possible_moves()
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

    private static move_focused_piece_to(selected_square: Square): void {
        if (this.piece_can_move_to(selected_square)) {
            this.focused_square?.piece?.move_to(selected_square)
        }
        Index.board.redraw()
    }

    private static move_piece_to(piece: Piece, selected_square: Square) {
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
