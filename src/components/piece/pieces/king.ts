import type { GridPoint } from "../../../global_types/grid_point"
import { Color } from "../color"
import Piece from "../piece"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
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
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 0, [])
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 1, [])
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, 1, [])
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 1, [])
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 0, [])
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, -1, [])
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, -1, [])
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, -1, [])
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }

    private squares_surrounding_king(): string[] {
        let list: string[] = []
        let gp: GridPoint | undefined = this.grid_point
        for (let i = -1; i <= 1; i++) {
            for (let k = -1; k <= 1; k++) {
                if (i !== 0 || k !== 0) {
                    list.push(SquareID.pos_at_point({ row: gp!.row + i, col: gp!.col + k }))
                }
            }
        }
        console.log(list)
        return list
    }

    public paths_to_checked_king(): string[][] {
        let paths_to_king: string[][] = []
        this.directions.forEach(direction => {
            const row_modifier: number = piece_direction_modifier(direction).row
            const col_modifier: number = piece_direction_modifier(direction).col
            const initial_row: number = this.grid_point!.row + row_modifier
            const initial_col: number = this.grid_point!.col + col_modifier
            let blocking_pieces: Piece[] = []

            this.find_check_path_to_king(initial_row, initial_col, row_modifier, col_modifier, direction, 1, paths_to_king, [], blocking_pieces)
            if (blocking_pieces.length === 1) {
                blocking_pieces[0]!.is_blocking_check = true
            }
            if (blocking_pieces.length > 1) {
                blocking_pieces.forEach(piece => {
                    piece.is_blocking_check = false
                })
            }
        })
        return paths_to_king
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
        console.log("Checking Square:", SquareID.pos_at_point({ row, col }))

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
                    path_to_king.push(SquareID.pos_at_point({ row: row, col: col }))
                    list_of_paths.push(path_to_king)
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

    // TODO - FUCKING FIGURE IT
    private continue_check_path_of_king(direction: PieceDirections) {
        const initial_row: number = this.grid_point!.row + inverse(piece_direction_modifier(direction).row)
        const initial_col: number = this.grid_point!.col + inverse(piece_direction_modifier(direction).col)


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