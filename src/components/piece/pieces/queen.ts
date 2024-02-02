import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import { PieceDirections } from "../piece_directions"
import type {Color} from "../color"
import type { GridPoint } from "../../../global_types/grid_point"
import SquareGrid from "../../../models/square_grid"

export default class Queen extends Piece implements Piece_Interface {
    move_distance: number = 8
    directions: PieceDirections[]

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
            PieceDirections.north_west
        ]
    }

    public calculate_possible_moves(restrictions: string[][]): void {
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 0, restrictions)
                    break;
                case PieceDirections.north_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, 1, restrictions)
                    break;
                case PieceDirections.east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, 1, restrictions)
                    break;
                case PieceDirections.south_east:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 1, restrictions)
                    break;
                case PieceDirections.south:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, 0, restrictions)
                    break;
                case PieceDirections.south_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 1, -1, restrictions)
                    break;
                case PieceDirections.west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, 0, -1, restrictions)
                    break;
                case PieceDirections.north_west:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, -1, -1, restrictions)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }
}