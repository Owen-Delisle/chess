import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections } from "../piece_directions"
import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"

export default class Pawn extends Piece implements Piece_Interface {
    largest_move_distance: number = 2
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

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("Pawn Piece")
        let current_position: GridPoint | undefined
        current_position = SquareGrid.point_by_piece_id(this.title)

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }

        return undefined
    }

    private possible_moves_arr(current_pos: GridPoint): GridPoint[] {
        let possible_moves: GridPoint[] = []

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.move_north(current_pos, possible_moves)
                    break;
                case PieceDirections.north_east:
                    this.move_north_east(current_pos, possible_moves)
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
        if (current_pos.row - 1 >= 0) {
            if (this.piece_at_grid_point(
                current_pos.row - this.largest_move_distance,
                current_pos.col) === undefined) {
                for (let distance = 1; distance <= this.largest_move_distance; distance++) {
                    possible_moves.push({
                        row: current_pos.row - distance,
                        col: current_pos.col
                    })
                }
                this.largest_move_distance = 1
            }
        }
    }

    private move_north_east(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row - 1 >= 0 && current_pos.col + 1 <= 7) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                                    current_pos.row - 1,
                                    current_pos.col + 1)
            if (north_east_piece !== undefined) {
                if(north_east_piece.color !== this.color) {
                    possible_moves.push({
                        row: current_pos.row - 1,
                        col: current_pos.col + 1
                    })
                }
            }
        }
    }

    private move_north_west(current_pos: GridPoint, possible_moves: GridPoint[]) {
        if (current_pos.row - 1 >= 0 && current_pos.col - 1 >= 0) {
            let north_east_piece: Piece | undefined
            north_east_piece = this.piece_at_grid_point(
                                    current_pos.row - 1,
                                    current_pos.col - 1)
            if (north_east_piece !== undefined) {
                if(north_east_piece.color !== this.color) {
                    possible_moves.push({
                        row: current_pos.row - 1,
                        col: current_pos.col - 1
                    })
                }
            }
        }
    }
}