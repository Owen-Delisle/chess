import type { GridPoint } from "src/global_types/grid_point"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import type { Color } from "../color"
import SquareGrid from "../../../models/square_grid"

export default class Bishop extends Piece implements Piece_Interface {
    move_distance: number = 8
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

    public calculate_possible_moves(): GridPoint[] {
        let possible_moves: GridPoint[] = []
        this.grid_point = SquareGrid.point_by_piece(this)

        if (this.grid_point == undefined) {
            return []
        }

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 1)
                    break;
                case PieceDirections.south_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south_west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, -1)
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
}