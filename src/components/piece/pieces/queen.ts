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
            PieceDirections.north_east,
            PieceDirections.south_east,
            PieceDirections.south_west,
            PieceDirections.north_west
        ]
    }

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("Bishop Piece")
        let current_position: GridPoint | undefined
        current_position = SquareGrid.point_by_piece_id(this.title)

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }

        return undefined
    }

    possible_moves_arr(current_pos: GridPoint): GridPoint[] {
        let possible_moves: GridPoint[] = []

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north_east:
                    this.move_piece(current_pos, possible_moves, this.move_distance, -1, -1)
                    break;
                case PieceDirections.south_east:
                    this.move_piece(current_pos, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south_west:
                    this.move_piece(current_pos, possible_moves, this.move_distance, 1, -1)
                    break;
                case PieceDirections.north_west:
                    this.move_piece(current_pos, possible_moves, this.move_distance, -1, 1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }
}