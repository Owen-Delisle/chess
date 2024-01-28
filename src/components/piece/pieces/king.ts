import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import type Square from "../../../components/square/square"
import type Rook from "./rook"
import { RookType } from "./rook"
import PieceList from "../piece_list"

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

    public calculate_possible_moves(): GridPoint[] {
        let possible_moves: GridPoint[] = []
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 0)
                    break;
                case PieceDirections.north_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 1)
                    break;
                case PieceDirections.east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, 0)
                    break;
                case PieceDirections.south_west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, -1)
                    break;
                case PieceDirections.west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 0, -1)
                    break;
                case PieceDirections.north_west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    public move_to(new_square: Square) {
        this.pos = new_square.square_id as string
        this.has_moved = true
    }

    public piece_specific_highlight_steps(): void {
        const rooks = PieceList.piece_list.filter(rook =>
            rook.type === PieceType.rook && rook.color === this.color)

        rooks.forEach(rook => {
            let r = rook as Rook
            if (
                this.squares_between_king_and_rook_empty(r) &&
                !this.has_moved && !r.has_moved && r
            ) {
                SquareGrid.square_by_grid_point({ row: r.grid_point!.row, col: r.grid_point!.col })
                    .add_border()
            }
        })
    }

    public squares_between_king_and_rook_empty(rook: Rook): boolean {
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
    }
}

export type CastleVars = {
    king_col_modifier: number
    rook_col_modifier: number
    number_of_squares_between_king_and_rook: number
    index_modifier: number
}