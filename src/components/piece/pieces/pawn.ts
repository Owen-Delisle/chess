import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections } from "../piece_directions"
import type { GridPoint } from "../../../global_types/grid_point"

export default class Pawn extends Piece implements Piece_Interface {
    move_distance: number
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType) {
        super(title, pos, svg)
        this.type = type
        this.move_distance = 1
        this.directions = [
            PieceDirections.north,
            PieceDirections.north_east,
            PieceDirections.north_west,
        ]
    }

    public calculate_possible_moves(): Array<GridPoint> | undefined {
        console.log("Pawn Piece")
        let current_position: GridPoint | undefined
        current_position = SquareGrid.position_by_piece_id(this.title)
        let arr: Array<GridPoint> | undefined = undefined

        if (current_position !== undefined) {
            return this.possible_moves_arr(current_position)
        }
        return arr
    }

    private possible_moves_arr(current_pos: GridPoint): Array<GridPoint> {
        let possible_moves: Array<GridPoint> = []

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

    private move_north(current_pos: GridPoint, possible_moves: Array<GridPoint>) {
        if (current_pos.row - 1 >= 0) {
            if (SquareGrid.piece_by_grid_point(
                {
                    row: current_pos.row - 1,
                    col: current_pos.col
                }
            ) !== undefined) {
                possible_moves.push({
                    row: current_pos.row - 1,
                    col: current_pos.col
                })
            }
        }
    }

    private move_north_east(current_pos: GridPoint, possible_moves: Array<GridPoint>) {
        if (current_pos.row - 1 >= 0 && current_pos.col + 1 <= 7) {
            if (SquareGrid.piece_by_grid_point(
                {
                    row: current_pos.row - 1,
                    col: current_pos.col + 1
                }
            ) !== undefined) {
                possible_moves.push({
                    row: current_pos.row - 1,
                    col: current_pos.col + 1
                })
            }
        }
    }

    private move_north_west(current_pos: GridPoint, possible_moves: Array<GridPoint>) {
        if (current_pos.row - 1 >= 0 && current_pos.col - 1 >= 0) {
            if (SquareGrid.piece_by_grid_point(
                {
                    row: current_pos.row - 1,
                    col: current_pos.col - 1
                }
            ) !== undefined) {
                possible_moves.push({
                    row: current_pos.row - 1,
                    col: current_pos.col - 1
                })
            }
        }
    }
}