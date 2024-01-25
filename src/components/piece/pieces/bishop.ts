import type { GridPoint } from "src/global_types/grid_point"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import type { Color } from "../color"
import SquareGrid from "../../../models/square_grid"
import Board from "../../board/board"

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
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, 1)
                    break;
                case PieceDirections.south_east:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south_west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, 1, -1)
                    break;
                case PieceDirections.north_west:
                    this.moves_list(current_pos, possible_moves, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }
}