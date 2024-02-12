import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import type {Color} from "../color"
import SquareGrid from "../../../models/square_grid"

export default class Queen extends Piece implements Piece_Interface {
    move_distance: number = 7
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, type, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.east,
            PieceDirections.south_east,
            PieceDirections.south,
            PieceDirections.south_west,
            PieceDirections.west,
            PieceDirections.north_west
        ]
    }

    public calculate_possible_moves(): void {
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
}