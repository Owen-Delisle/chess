import type { GridPoint } from "src/global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"

export default class Rook extends Piece implements Piece_Interface {
    move_distance: number = 7
    directions: PieceDirections[]
    has_moved: boolean = false
    rook_type: RookType

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color, rook_type: RookType) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.east,
            PieceDirections.south,
            PieceDirections.west
        ]
        this.rook_type = rook_type
    }

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("Rook Piece")
        let current_position: GridPoint | undefined
        current_position = SquareGrid.point_by_piece_id(this.title)

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }

        return undefined
    }

    public possible_moves_arr(current_pos: GridPoint): GridPoint[] {
        let possible_moves: GridPoint[] = []

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, 0)
                    break;
                case PieceDirections.east:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, 0)
                    break;
                case PieceDirections.west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 0, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }
}

export enum RookType {
    long_rook,
    short_rook
}