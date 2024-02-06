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

export default class King extends Piece implements Piece_Interface {
    move_distance: number = 1
    directions: PieceDirections[]
    has_moved: boolean = false

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
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 0)
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 1)
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 0)
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, -1)
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, -1)
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }

    private points_surrounding_king(): GridPoint[] {
        let list: GridPoint[] = []
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (row !== 0 || col !== 0) {
                    list.push({row, col})
                }
            }
        }
        return list
    }

    private positions_surrounding_king(): string[] {
        let list: string[] = []
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (row !== 0 || col !== 0) {
                    list.push(SquareID.pos_at_point({row: this.grid_point!.row+row, col: this.grid_point!.col+col}))
                }
            }
        }
        return list
    }

    public render_legal_squares_surrounding_king(): void {
        const psk = this.positions_surrounding_king()
        const apak = this.attacked_points_around_king()
        this.position_restrictions = psk.filter(position => !apak.includes(position));
    }

        public attacked_points_around_king(): string[] {
        let attacked_positions: string[] = []
        let index: number

        this.points_surrounding_king().forEach(point => {
            index = 0
            while(index < this.directions.length) {
                const direction = this.directions[index]
                const row_modifier: number = piece_direction_modifier(direction).row
                const col_modifier: number = piece_direction_modifier(direction).col

                const initial_row = this.grid_point!.row + point.row
                const initial_col = this.grid_point!.col + point.col

                const next_row = initial_row + row_modifier
                const next_col = initial_col + col_modifier

                if(this.check_if_point_around_king_is_attacked(initial_row, initial_col, next_row, next_col, row_modifier, col_modifier, direction, 1)) {
                    attacked_positions.push(SquareID.pos_at_point({row: initial_row, col: initial_col}))
                }
                index++
            }
        })
        return attacked_positions
    }

    private check_if_point_around_king_is_attacked(
        starting_row: number,
        starting_col: number,
        next_row: number,
        next_col: number,
        row_modifier: number,
        col_modifier: number,
        direction: PieceDirections,
        distance: number,
    ): boolean {

        // If all squares in direction have been searched and no piece of other color that can attack king in this direction have been found
        if (next_row < 0 || next_row >= Board.row_size || next_col < 0 || next_col >= Board.row_size) {
            return false
        }

        //If square is in bound
        const piece: Piece | undefined = SquareGrid.piece_by_grid_point({ row: next_row, col: next_col })

        // If Square has piece and piece is the same color as the king
        if (piece !== undefined && piece.color === this.color && piece !== this) {
            return false
        }

        // If Square has piece and piece is NOT the same color as the king
        if (piece !== undefined && piece.color !== this.color) {
            //If piece could attack king
            let direction: PieceDirections | undefined = direction_by_modifier({row: row_modifier, col: col_modifier})
            if(direction !== undefined) {
                if (piece.directions.includes(direction)) {
                    //If there are no pieces blocking path
                        if(piece.move_distance >= distance) {
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
            return this.check_if_point_around_king_is_attacked(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, ++distance)
        }

        return false
    }


    public render_check_paths_list(): void {
        const check_paths_list: {direction: PieceDirections, ordered_pieces_list: Piece[]}[] = this.check_path_lists_from_all_directions()
        check_paths_list.forEach(path => {
            this.render_path(path)
        });
    }

    private render_path(path: {direction: PieceDirections, ordered_pieces_list: Piece[]}): void {
        let blocking_pieces: Piece[] = []
        let first_attacking_piece: Piece | undefined

        path.ordered_pieces_list.forEach(piece => {
            if(piece.color === this.color) {
                if(first_attacking_piece === undefined) {
                    blocking_pieces.push(piece)
                }
            }

            if(piece.color !== this.color && first_attacking_piece === undefined) {
                let distance_between_attacker_and_king: number = distance_between_points(piece.grid_point!, this.grid_point!)-1
                if(piece.directions.includes(path.direction) && piece.move_distance >= distance_between_attacker_and_king) {
                    first_attacking_piece = piece
                }
            }
        });

        if(blocking_pieces.length === 1 && first_attacking_piece !== undefined) {
            const points_between_attacker_and_king: string[] = SquareID.pos_between_points(first_attacking_piece.grid_point!, this.grid_point!)
            blocking_pieces[0].position_restrictions = points_between_attacker_and_king
        }

        if(blocking_pieces.length === 0 && first_attacking_piece !== undefined) {
            const points_between_attacker_and_king: string[] = SquareID.pos_between_points(first_attacking_piece.grid_point!, this.grid_point!)
            Piece.position_restrictions = points_between_attacker_and_king
        }
    }

    private check_path_lists_from_all_directions(): {direction: PieceDirections, ordered_pieces_list: Piece[]}[]{
        let check_path_lists: {direction: PieceDirections, ordered_pieces_list: Piece[]}[] = []
        this.directions.forEach(direction => {
            check_path_lists.push({direction: direction, ordered_pieces_list: this.list_of_pieces_in_direction(direction)})
        })
        return check_path_lists
    }

    private list_of_pieces_in_direction(direction: PieceDirections): Piece[] {
        const starting_point: GridPoint = this.grid_point!
        let current_row: number = starting_point.row
        let current_col: number = starting_point.col
        let pieces_in_path: Piece[] = []
        let modifier: {row: number, col: number} = piece_direction_modifier(direction)

        while(!this.stopping_conditions(current_row, current_col, modifier)) {
            current_row = current_row + modifier.row
            current_col = current_col + modifier.col
            let piece_at_position = SquareGrid.piece_by_grid_point({row: current_row, col: current_col})
            if(piece_at_position != undefined) {
                pieces_in_path.push(piece_at_position)
            }
        }

        return pieces_in_path
    } 

    private stopping_conditions(current_row: number, current_col: number, modifier: {row: number, col: number}): boolean {
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

    //Overloaded from Piece
    public piece_specific_highlight_steps(): void {
        const rooks = PieceList.piece_list.filter(rook =>
            rook.type === PieceType.rook && rook.color === this.color)

        this.add_borders_to_castleable_rooks(rooks)
    }

    private add_borders_to_castleable_rooks(rooks: Piece[]) {
        rooks.forEach(piece => {
            let rook = piece as Rook
            if (
                this.squares_between_king_and_rook_empty(rook) &&
                !this.has_moved && !rook.has_moved
            ) {
                SquareGrid.square_by_grid_point({ row: rook.grid_point!.row, col: rook.grid_point!.col })
                    .add_border()
            }
        })
    }

    public squares_between_king_and_rook_empty(rook: Rook): boolean {
        if (this.has_moved) return false

        let castle_vars: CastleVars = this.castle_vars_for_rook_type(rook.rook_type)

        for (let index = 1; index <= castle_vars.number_of_squares_between_king_and_rook; index++) {
            let point: GridPoint = { row: this.grid_point!.row, col: this.grid_point!.col + (index * castle_vars.index_modifier) }
            if (SquareGrid.piece_by_grid_point(point) != undefined) {
                return false
            }
        }
        return true
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