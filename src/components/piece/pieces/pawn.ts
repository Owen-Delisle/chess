import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections } from "../piece_directions"
import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import type Square from "../../square/square"
import Board from "../../../components/board/board"

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

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 0)
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

    public move_to(new_square: Square) {
        this.pos = new_square.square_id as string
        this.move_distance = 2
    }

    //Overloaded from Piece
    public highlight_action_piece(current_pos: GridPoint, row_modifier: number, col_modifier: number, distance: number, possible_moves: GridPoint[]) {
        if(Board.are_coors_within_board_bounds(current_pos.row - 1, current_pos.col - 1)) {
            this.should_highlight_target(SquareGrid.square_by_grid_point({
                row: current_pos.row - 1,
                col: current_pos.col - 1
            }), possible_moves)
        }
        if(Board.are_coors_within_board_bounds(current_pos.row + 1, current_pos.col + 1)) {
            this.should_highlight_target(SquareGrid.square_by_grid_point({
                row: current_pos.row - 1,
                col: current_pos.col + 1
            }), possible_moves)
        }
    }
}