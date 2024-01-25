import type { GridPoint } from "src/global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"

export default class Knight extends Piece implements Piece_Interface {
    move_distance: number = 3
    directions: KnightDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            KnightDirections.up_right,
            KnightDirections.right_up,
            KnightDirections.right_down,
            KnightDirections.down_right,
            KnightDirections.down_left,
            KnightDirections.left_down,
            KnightDirections.left_up,
            KnightDirections.up_left,
        ]
    }

    public calculate_possible_moves(): GridPoint[] | undefined {
        console.log("Knight Piece")
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
                case KnightDirections.up_right:
                    this.add_possible_move_point(current_pos, possible_moves, -2, 1)
                    break;
                case KnightDirections.right_up:
                    this.add_possible_move_point(current_pos, possible_moves, -1, 2)
                    break;
                case KnightDirections.right_down:
                    this.add_possible_move_point(current_pos, possible_moves, 1, 2)
                    break;
                case KnightDirections.down_right:
                    this.add_possible_move_point(current_pos, possible_moves, 2, 1)
                    break;
                case KnightDirections.down_left:
                    this.add_possible_move_point(current_pos, possible_moves, 2, -1)
                    break;
                case KnightDirections.left_down:
                    this.add_possible_move_point(current_pos, possible_moves, 1, -2)
                    break;
                case KnightDirections.left_up:
                    this.add_possible_move_point(current_pos, possible_moves, -1, -2)
                    break;
                case KnightDirections.up_left:
                    this.add_possible_move_point(current_pos, possible_moves, -2, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    private add_possible_move_point(
        current_pos: GridPoint,
        possible_moves: GridPoint[],
        row_mod: number,
        col_mod: number,
    ): void {
        if (Piece.point_within_board_bounds(current_pos, row_mod, col_mod)) {
            if (this.piece_at_grid_point(
                current_pos.row + row_mod,
                current_pos.col + col_mod)
                === undefined) {
                possible_moves.push({
                    row: current_pos.row + row_mod,
                    col: current_pos.col + col_mod
                })
            }
            console.log(possible_moves)
        }
    }
}

enum KnightDirections {
    up_right,
    right_up,
    right_down,
    down_right,
    down_left,
    left_down,
    left_up,
    up_left
}