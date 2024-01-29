import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import Board from "../../board/board"
import type Square from "../../../components/square/square"
import SquareID from "../../../components/square/square_id"

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

    public calculate_possible_moves(): GridPoint[] {
        let possible_moves: GridPoint[] = []
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case KnightDirections.up_right:
                    this.add_possible_move_point(this.grid_point!, -2, 1)
                    break;
                case KnightDirections.right_up:
                    this.add_possible_move_point(this.grid_point!, -1, 2)
                    break;
                case KnightDirections.right_down:
                    this.add_possible_move_point(this.grid_point!, 1, 2)
                    break;
                case KnightDirections.down_right:
                    this.add_possible_move_point(this.grid_point!, 2, 1)
                    break;
                case KnightDirections.down_left:
                    this.add_possible_move_point(this.grid_point!, 2, -1)
                    break;
                case KnightDirections.left_down:
                    this.add_possible_move_point(this.grid_point!, 1, -2)
                    break;
                case KnightDirections.left_up:
                    this.add_possible_move_point(this.grid_point!, -1, -2)
                    break;
                case KnightDirections.up_left:
                    this.add_possible_move_point(this.grid_point!, -2, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    private add_possible_move_point(
        current_pos: GridPoint,
        row_mod: number,
        col_mod: number,
    ): void {
        if (Board.are_coors_within_board_bounds(current_pos.row + row_mod, current_pos.col + col_mod)) {
            let point_of_square: GridPoint = {row: current_pos.row + row_mod,col: current_pos.col + col_mod}
            let pos_to_add: string = SquareID.pos_at_point(point_of_square)
            
            let square_being_checked: Square | undefined = SquareGrid.square_by_grid_point(point_of_square)
            if (square_being_checked.piece_attached_to_square() == undefined) {
                this.possible_moves.push(pos_to_add)
            } else if (square_being_checked.piece_attached_to_square()!.color != this.color) {
                this.possible_moves.push(pos_to_add)
                square_being_checked.add_border()
            }
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