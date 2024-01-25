import type { GridPoint } from "src/global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"

export default class Rook extends Piece implements Piece_Interface {
    largest_move_distance: number = 7
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north,
            PieceDirections.east,
            PieceDirections.south,
            PieceDirections.west
        ]
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
                    this.move_north(current_pos, possible_moves)
                    break;
                case PieceDirections.east:
                    this.move_east(current_pos, possible_moves)
                    break;
                case PieceDirections.south:
                    this.move_south(current_pos, possible_moves)
                    break;
                case PieceDirections.west:
                    this.move_west(current_pos, possible_moves)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }
    move_north(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            -1,
            0
        )
    }
    move_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            0,
            1
        )
    }
    move_south(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            1,
            0
        )
    }
    move_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            0,
            -1
        )
    }
}