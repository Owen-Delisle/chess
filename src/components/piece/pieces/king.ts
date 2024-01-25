import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"

export default class King extends Piece implements Piece_Interface {
    largest_move_distance: number = 2
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
            PieceDirections.north_west,
        ]
    }

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("King Piece")

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
                case PieceDirections.north_east:
                    this.move_north_east(current_pos, possible_moves)
                    break;
                case PieceDirections.east:
                    this.move_east(current_pos, possible_moves)
                    break;
                case PieceDirections.south_east:
                    this.move_south_east(current_pos, possible_moves)
                    break;
                case PieceDirections.south:
                    this.move_south(current_pos, possible_moves)
                    break;
                case PieceDirections.south_west:
                    this.move_south_west(current_pos, possible_moves)
                    break;
                case PieceDirections.west:
                    this.move_west(current_pos, possible_moves)
                    break;
                case PieceDirections.north_west:
                    this.move_north_west(current_pos, possible_moves)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    private move_north(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            -1,
            0
        )
    }

    private move_north_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            -1,
            1
        )
    }

    private move_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            0,
            1
        )
    }

    private move_south_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            1,
            1
        )
    }

    private move_south(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            1,
            0
        )
    }

    private move_south_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            1,
            -1
        )
    }

    private move_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            0,
            -1
        )
    }

    private move_north_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        this.build_possible_moves_list(
            this.largest_move_distance,
            current_pos,
            possible_moves,
            -1,
            -1
        )
    }
}