import type Square from "../components/square/square"
import Piece from "../components/piece/piece"
import type { GridPoint } from "../global_types/grid_point"
import SquareGrid from "../models/square_grid"
import Index from "../index"
import type King from "../components/piece/pieces/king"
import { PieceType } from "src/components/piece/piece_types"
import type Rook from "../components/piece/pieces/rook"
import { RookType } from "../components/piece/pieces/rook"

export default class MoveController {
    private static focused_square: Square | undefined
    private static possible_moves: GridPoint[] = []

    public static on_square_click(new_square: Square) {
        if (this.already_has_piece_focused()) {
            this.clear_visuals()
        }
        if (this.new_square_contains_piece(new_square)) {
            this.check_for_castle(this.focused_square, new_square)
            this.focused_square = new_square
            new_square.add_border()
            this.load_possible_moves_list(new_square)
        } else if (this.already_has_piece_focused()) {
            this.move_piece_at(new_square)
        }
    }
    
    private static already_has_piece_focused(): boolean {
        return this.focused_square !== undefined
    }

    private static new_square_contains_piece(new_square: Square): boolean {
        return new_square.piece !== undefined
    }

    private static check_for_castle(focused_square: Square | undefined, new_square: Square | undefined) {
        let focused_piece: Piece = focused_square?.piece!
        let new_piece: Piece = new_square?.piece!
        let king_piece: King
        let rook_piece: Rook

        if(focused_piece.type == PieceType.king && new_piece.type == PieceType.rook) {
            king_piece = focused_piece as King
            rook_piece = new_piece as Rook

            if(rook_piece.rook_type == RookType.short_rook) {

            }
            if(rook_piece.rook_type == RookType.short_rook) {

            }
        }
    }

    private static clear_visuals(): void {
        this.focused_square?.remove_border()
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

    private static move_piece_at(selected_square: Square): void {
        if (this.piece_can_move_to_selected_square(selected_square)) {
            this.focused_square?.piece?.move_to(selected_square.square_id as string)
        }
        Index.board.redraw()
    }

    private static piece_can_move_to_selected_square(selected_square: Square): boolean {
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
