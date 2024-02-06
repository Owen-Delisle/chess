import type { GridPoint } from "src/global_types/grid_point"
import Piece from "../piece"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import type { Color } from "../color"
import SquareGrid from "../../../models/square_grid"

export default class Bishop extends Piece implements Piece_Interface {
    move_distance: number = 7
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north_east,
            PieceDirections.south_east,
            PieceDirections.south_west,
            PieceDirections.north_west
        ]
    }

    public calculate_possible_moves(): void {
        this.grid_point = SquareGrid.point_by_piece(this)
        
        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north_east))
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south_east))
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.south_west))
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.north_west))
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }
}