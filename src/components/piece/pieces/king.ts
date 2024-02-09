import type { GridPoint } from "../../../global_types/grid_point"
import { Color } from "../color"
import Piece from "../piece"
import { PieceDirections, piece_direction_modifier, direction_by_modifier } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import type Square from "../../../components/square/square"
import type Rook from "./rook"
import { RookType } from "./rook"
import PieceList from "../piece_list"
import SquareID from "../../../components/square/square_id"
import Board from "../../../components/board/board"
import { distance_between_points } from "../../../utils/math"
import { arrays_are_equal } from "../../../utils/arrays"
import { surrounding_points } from "../../../utils/grid"
import { not_color } from "../color"
import { every_direction } from "../piece_directions"

export default class King extends Piece implements Piece_Interface {
    move_distance: number = 1
    directions: PieceDirections[]
    has_moved: boolean = false
    in_check: boolean = false
    positions_to_be_blocked: string[] = []

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.east,
            PieceDirections.south_east,
            PieceDirections.south,
            PieceDirections.south_west,
            PieceDirections.west,
            PieceDirections.north_west,
        ]
    }

    public calculate_possible_moves(): void {
        this.render_legal_squares_surrounding_king()

        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north))
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north_east))
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.east))
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south_east))
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south))
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south_west))
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.west))
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north_west))
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }

    private points_surrounding_king(): GridPoint[] {
        return surrounding_points(this.grid_point!)
    }

    private moveable_positions_surrounding_king(): string[] {
        const list: string[] = surrounding_points(this.grid_point!).filter(point => {
            const piece: Piece | undefined = SquareGrid.piece_by_grid_point(point)
            if (piece === undefined) {
                return true
            }
            if (!this.check_if_piece_is_covered_in_any_direction(piece)) {
                this.possible_moves.push(piece.pos)
                return true
            }
        }).map((point) => SquareID.pos_at_point(point));
        return list
    }

    public check_for_checkmate() {
        if (!this.any_piece_can_move()) {
            console.log("Checkmate")
        }
    }

    public any_piece_can_move(): boolean {
        const any_piece_has_move = PieceList.pieces_by_color(this.color).some(piece =>
            piece.possible_moves.length > 0
        );

        return any_piece_has_move
    }

    public render_legal_squares_surrounding_king(): void {
        const positions_surrounding_king = this.moveable_positions_surrounding_king()
        const attacked_points_around_king = this.attacked_points_around_king()

        if (arrays_are_equal(positions_surrounding_king, attacked_points_around_king)) {
            this.move_distance = 0
        } else {
            this.move_distance = 1
            this.position_restrictions = positions_surrounding_king.filter(position => !attacked_points_around_king.includes(position));
        }
    }

    public attacked_points_around_king(): string[] {
        let attacked_positions: string[] = []

        this.points_surrounding_king().forEach(point => {
            every_direction().forEach(direction => {
                const row_modifier: number = piece_direction_modifier(direction).row
                const col_modifier: number = piece_direction_modifier(direction).col

                const initial_row = point.row
                const initial_col = point.col

                const next_row = initial_row + row_modifier
                const next_col = initial_col + col_modifier

                if (this.check_if_square_is_covered_by_piece_of_color(initial_row, initial_col, next_row, next_col, row_modifier, col_modifier, direction, 1, not_color(this.color))) {
                    const next_pos: string = SquareID.pos_at_point({ row: initial_row, col: initial_col })
                    if (!attacked_positions.includes(next_pos)) {
                        attacked_positions.push(next_pos)
                    }
                }
            })
        })
        return attacked_positions
    }

    private check_if_piece_is_covered_in_any_direction(piece: Piece): boolean {
        return every_direction().some(direction => {
            const starting_row: number = piece.grid_point!.row
            const starting_col: number = piece.grid_point!.col
            const next_row: number = piece.grid_point!.row + piece_direction_modifier(direction).row
            const next_col: number = piece.grid_point!.col + piece_direction_modifier(direction).col
            const row_modifier: number = piece_direction_modifier(direction).row
            const col_modifier: number = piece_direction_modifier(direction).col

            return this.check_if_square_is_covered_by_piece_of_color(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, 1, piece.color)
        });
    }

    private check_if_square_is_covered_by_piece_of_color(
        starting_row: number,
        starting_col: number,
        next_row: number,
        next_col: number,
        row_modifier: number,
        col_modifier: number,
        direction: PieceDirections,
        distance: number,
        color: Color,
    ): boolean {

        // If all squares in direction have been searched and no piece of other color that can attack king in this direction have been found
        // TODO -- USE BOARDS BOUNDS CHECKER
        if (next_row < 0 || next_row >= Board.row_size || next_col < 0 || next_col >= Board.row_size) {
            return false
        }

        //If square is in bound
        const piece: Piece | undefined = SquareGrid.piece_by_grid_point({ row: next_row, col: next_col })

        // If Square has piece and piece is NOT the same color as the piece
        if (piece !== undefined && piece.color !== color && piece !== this) {
            return false
        }

        // If Square has piece and piece IS the same color as the piece
        if (piece !== undefined && piece.color === color) {
            //If piece could attack king
            let direction: PieceDirections | undefined = direction_by_modifier({ row: row_modifier, col: col_modifier })
            if (direction !== undefined) {
                if (piece.directions.includes(direction) || this.pawn_attack_square(piece, direction, distance)) {
                    if (piece.move_distance >= distance) {
                        return true
                    }
                    return false
                }
            }
        }

        // If square is empty
        if (piece === undefined || piece === this) {
            next_row = next_row + row_modifier
            next_col = next_col + col_modifier
            return this.check_if_square_is_covered_by_piece_of_color(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, ++distance, color)
        }

        return false
    }

    private pawn_attack_square(piece: Piece, direction: PieceDirections, distance: number): boolean {
        if (distance <= piece.move_distance) {
            if (piece.type === PieceType.pawn) {
                if (direction === PieceDirections.north_west) {
                    return true
                }
                if (direction === PieceDirections.north_east) {
                    return true
                }
            }
        }
        return false
    }


    public render_check_paths_list(): void {
        this.in_check = false

        const check_paths_list: { direction: PieceDirections, ordered_pieces_list: Piece[] }[] = this.check_path_lists_from_every_direction()
        check_paths_list.forEach(path => {
            this.render_path(path)
        });
    }

    private render_path(path: { direction: PieceDirections, ordered_pieces_list: Piece[] }): void {
        const pieces: Piece[] = path.ordered_pieces_list

        if (pieces.length < 1) {
            this.in_check = false
            return
        }

        const first_piece = pieces[0]

        if (first_piece.color === this.color) {
            if (pieces.length > 1) {
                if (this.piece_in_path_conditions(pieces[1], path.direction)) {
                    first_piece.position_restrictions = SquareID.pos_between_points(this.grid_point!, pieces[1].grid_point!)
                }
            }
        }

        if (this.piece_in_path_conditions(first_piece, path.direction)) {
            Piece.position_restrictions = SquareID.pos_between_points(this.grid_point!, first_piece.grid_point!)
        }
    }

    private piece_in_path_conditions(piece: Piece, direction: PieceDirections): boolean {
        if (piece.color === not_color(this.color)) {
            if (piece.directions.includes(direction)) {
                if (piece.move_distance >= distance_between_points(piece.grid_point!, this.grid_point!) - 1) {
                    return true
                }
            }
        }
        return false
    }

    private check_path_lists_from_every_direction(): { direction: PieceDirections, ordered_pieces_list: Piece[] }[] {
        let check_path_lists: { direction: PieceDirections, ordered_pieces_list: Piece[] }[] = []
        every_direction().forEach(direction => {
            check_path_lists.push({ direction: direction, ordered_pieces_list: this.list_of_pieces_in_direction(direction) })
        })
        return check_path_lists
    }

    private list_of_pieces_in_direction(direction: PieceDirections): Piece[] {
        const starting_point: GridPoint = this.grid_point!
        let current_row: number = starting_point.row
        let current_col: number = starting_point.col
        let pieces_in_path: Piece[] = []
        let modifier: { row: number, col: number } = piece_direction_modifier(direction)

        while (!this.stopping_conditions(current_row, current_col, modifier, direction)) {
            current_row = current_row + modifier.row
            current_col = current_col + modifier.col

            let piece_at_position = SquareGrid.piece_by_grid_point({ row: current_row, col: current_col })
            if (piece_at_position != undefined) {
                pieces_in_path.push(piece_at_position)
            }
        }

        return pieces_in_path
    }

    private stopping_conditions(current_row: number, current_col: number, modifier: { row: number, col: number }, direction: PieceDirections): boolean {
        let should_stop: boolean = false

        let next_row: number = current_row + modifier.row
        let next_col: number = current_col + modifier.col

        if (next_row < 0 || next_row >= Board.row_size || next_col < 0 || next_col >= Board.row_size) {
            should_stop = true
        }

        return should_stop
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.has_moved = true
            this.possible_moves = []
            resolve()
        })
    }

    public rooks_for_king(): Rook[] {
        const pieces = PieceList.piece_list.filter(rook =>
            rook.type === PieceType.rook && rook.color === this.color)

        const rooks: Rook[] = pieces as Rook[]

        return rooks
    }

    public add_borders_to_castleable_rooks(rooks: Piece[]) {
        rooks.forEach(piece => {
            let rook = piece as Rook
            if (this.squares_between_king_and_rook_empty(rook) && !this.has_moved && !rook.has_moved && !this.in_check && !this.kings_castle_squares_attacked(rook)) {
                SquareGrid.square_by_grid_point({ row: rook.grid_point!.row, col: rook.grid_point!.col })
                    .add_border()
            }
        })
    }

    public squares_between_king_and_rook_empty(rook: Rook): boolean {
        const castle_vars = this.castle_vars_for_rook_type(rook.rook_type)

        const square_beside_king: GridPoint = { row: this.grid_point!.row, col: this.grid_point!.col + castle_vars.index_modifier }
        const square_beside_rook: GridPoint = { row: rook.grid_point!.row, col: rook.grid_point!.col - castle_vars.index_modifier }

        let positions_between_king_and_rook = SquareID.pos_between_points(square_beside_king, square_beside_rook)
        const any_pieces = positions_between_king_and_rook.some(position => PieceList.piece_by_position(position) !== undefined)
        return !any_pieces
    }

    public kings_castle_squares_attacked(rook: Rook): boolean {
        const castle_vars = this.castle_vars_for_rook_type(rook.rook_type)

        const first_point: GridPoint = { row: this.grid_point!.row, col: this.grid_point!.col + castle_vars.index_modifier }
        const second_point: GridPoint = { row: first_point.row, col: first_point!.col + castle_vars.index_modifier }

        const first_position = SquareID.pos_at_point(first_point)
        const second_position = SquareID.pos_at_point(second_point)

        const any_piece = PieceList.pieces_by_other_color(this.color).some(piece => piece.possible_moves.some(move => [first_position, second_position].includes(move)));

        return any_piece
    }

    public castle_vars_for_rook_type(rook_type: RookType): CastleVars {
        if (this.color == Color.white) {
            switch (rook_type) {
                case RookType.long_rook:
                    return {
                        king_col_modifier: -2,
                        rook_col_modifier: 3,
                        number_of_squares_between_king_and_rook: 3,
                        index_modifier: -1
                    }
                case RookType.short_rook:
                    return {
                        king_col_modifier: 2,
                        rook_col_modifier: -2,
                        number_of_squares_between_king_and_rook: 2,
                        index_modifier: 1
                    }
            }
        } else {
            switch (rook_type) {
                case RookType.long_rook:
                    return {
                        king_col_modifier: 2,
                        rook_col_modifier: -3,
                        number_of_squares_between_king_and_rook: 3,
                        index_modifier: 1
                    }
                case RookType.short_rook:
                    return {
                        king_col_modifier: -2,
                        rook_col_modifier: 2,
                        number_of_squares_between_king_and_rook: 2,
                        index_modifier: -1
                    }
            }
        }
    }
}

export type CastleVars = {
    king_col_modifier: number
    rook_col_modifier: number
    number_of_squares_between_king_and_rook: number
    index_modifier: number
}