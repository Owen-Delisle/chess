import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import SquareGrid from "../../../models/square_grid"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import Board from "../../board/board"
import type Square from "../../../components/square/square"
import SquareID from "../../../components/square/square_id"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"

export default class Knight extends Piece implements Piece_Interface {
    move_distance: number = 1
    directions: PieceDirections[]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.up_right,
            PieceDirections.right_up,
            PieceDirections.right_down,
            PieceDirections.down_right,
            PieceDirections.down_left,
            PieceDirections.left_down,
            PieceDirections.left_up,
            PieceDirections.up_left,
        ]
    }

    public calculate_possible_moves(): void {
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.up_right:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.up_right))
                    break;
                case PieceDirections.right_up:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.right_up))
                    break;
                case PieceDirections.right_down:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.right_down))
                    break;
                case PieceDirections.down_right:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.down_right))
                    break;
                case PieceDirections.down_left:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.down_left))
                    break;
                case PieceDirections.left_down:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.left_down))
                    break;
                case PieceDirections.left_up:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.left_up))
                    break;
                case PieceDirections.up_left:
                    this.build_possible_moves_list(this.grid_point!, this.move_distance, piece_direction_modifier(PieceDirections.up_left))
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }
}
