import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import type Square from "../../../components/square/square"

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

    public calculate_possible_moves(): void {
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north))
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.east))
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south))
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.west))
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.has_moved = true
            this.possible_moves = []
            resolve()
        })
    }
}

export enum RookType {
    long_rook,
    short_rook
}