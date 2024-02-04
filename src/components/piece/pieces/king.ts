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
import { inverse } from "../../../utils/math"

export default class King extends Piece implements Piece_Interface {
    move_distance: number = 2
    directions: PieceDirections[]
    has_moved: boolean = false
    black_listed_squares: string[] = []

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
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 0, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 1, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, 1, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 1, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 0, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, -1, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, -1, this.legal_squares_surrounding_king())
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, -1, this.legal_squares_surrounding_king())
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        console.log(this.attacked_points_around_king())
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

    private legal_squares_surrounding_king(): string[] {
        const psk = this.positions_surrounding_king()
        const apak = this.attacked_points_around_king()
        return psk.filter(position => !apak.includes(position)); 
    }

    public paths_to_checked_king(): string[] {
        let paths_to_king: string[][] = []
        this.black_listed_squares = []
        
        this.directions.forEach(direction => {
            const row_modifier: number = piece_direction_modifier(direction).row
            const col_modifier: number = piece_direction_modifier(direction).col
            const initial_row: number = this.grid_point!.row + row_modifier
            const initial_col: number = this.grid_point!.col + col_modifier
            let blocking_pieces: Piece[] = []

            this.find_check_path_to_king(initial_row, initial_col, row_modifier, col_modifier, direction, 1, paths_to_king, [], blocking_pieces)
            if (blocking_pieces.length === 1) {
                blocking_pieces[blocking_pieces.length-1]!.is_blocking_check = true
            }
            if (blocking_pieces.length > 1) {
                blocking_pieces.forEach(piece => {
                    piece.is_blocking_check = false
                })
            }
        })
        return paths_to_king.flat()
    }

    private find_check_path_to_king(
        row: number,
        col: number,
        row_modifier: number,
        col_modifier: number,
        direction: PieceDirections,
        distance: number,
        list_of_paths: string[][],
        path_to_king: string[],
        blocking_pieces: Piece[]
    ): void {
        // If all squares in direction have been searched and no piece of other color that can attack king in this direction have been found
        if (row < 0 || row >= Board.row_size || col < 0 || col >= Board.row_size) {
            while (blocking_pieces.length > 0) {
                blocking_pieces.pop();
            }
            return
        }

        //If square is in bound
        const piece: Piece | undefined = SquareGrid.piece_by_grid_point({ row, col })
        const new_row: number = row + row_modifier
        const new_col: number = col + col_modifier
        // console.log("Checking Square:", SquareID.pos_at_point({ row, col }))

        // If Square has piece and piece is the same color as the king
        if (piece !== undefined && piece.color === this.color) {
            if (!blocking_pieces.includes(piece)) {
                blocking_pieces.push(piece)
                return this.find_check_path_to_king(new_row, new_col, row_modifier, col_modifier, direction, ++distance, list_of_paths, path_to_king, blocking_pieces)
            }
        }

        // If Square has piece and piece is NOT the same color as the king
        if (piece !== undefined && piece.color !== this.color) {
            //If piece could attack king
            if (piece.directions.includes(direction)) {
                //If there are no pieces blocking path
                if (blocking_pieces.length < 1) {
                    if(piece.move_distance >= distance) {
                        path_to_king.push(SquareID.pos_at_point({ row: row, col: col }))
                        list_of_paths.push(path_to_king)
                        this.continue_check_path_of_king(direction)
                    }
                }
                // If there is only one piece blocking king
                if (blocking_pieces.length === 1) {
                    blocking_pieces[0].is_blocking_check = true
                }
                return
            }
        }

        // If square is empty
        if (piece === undefined) {
            if (blocking_pieces.length < 1) {
                path_to_king.push(SquareID.pos_at_point({ row, col }))
            }
            return this.find_check_path_to_king(new_row, new_col, row_modifier, col_modifier, direction, ++distance, list_of_paths, path_to_king, blocking_pieces)
        }
    }

    public attacked_points_around_king(): string[] {
        let attacked_positions: string[] = []
        let has_found_attacker: boolean = false
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
                    console.log("FOUND AN ATTACKER AT:", SquareID.pos_at_point({row: initial_row, col: initial_col}))
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
        // console.log("Square:", SquareID.pos_at_point({row: starting_row, col: starting_col}), "Checking Square:", SquareID.pos_at_point({ row: next_row, col: next_col }))

        // If Square has piece and piece is the same color as the king
        if (piece !== undefined && piece.color === this.color) {
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
        if (piece === undefined) {
            next_row = next_row + row_modifier
            next_col = next_col + col_modifier
            return this.check_if_point_around_king_is_attacked(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, ++distance)
        }

        return false
    }

    private continue_check_path_of_king(direction: PieceDirections) {
        if(Board.are_coors_within_board_bounds(this.grid_point!.row + piece_direction_modifier(direction).row, this.grid_point!.col + piece_direction_modifier(direction).col)) {
            const posetive_row: number = this.grid_point!.row + piece_direction_modifier(direction).row
            const posetive_col: number = this.grid_point!.col + piece_direction_modifier(direction).col
            this.black_listed_squares.push(SquareID.pos_at_point({row: posetive_row, col: posetive_col}))
        }

        if(Board.are_coors_within_board_bounds(this.grid_point!.row + piece_direction_modifier(direction).row, this.grid_point!.col + piece_direction_modifier(direction).col)) {
            const negative_row: number = this.grid_point!.row - inverse(piece_direction_modifier(direction).row)
            const negative_col: number = this.grid_point!.col - inverse(piece_direction_modifier(direction).col)
            this.black_listed_squares.push(SquareID.pos_at_point({row: negative_row, col: negative_col}))
        }
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