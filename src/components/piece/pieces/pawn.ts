import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections } from "../piece_directions"
import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"

export default class Pawn extends Piece implements Piece_Interface {
    move_distance: number = 3
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.north_west,
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
                case PieceDirections.north:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 0)
                    this.move_distance = 2
                    break;
                case PieceDirections.north_east:
                    break;
                case PieceDirections.north_west:
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }
}