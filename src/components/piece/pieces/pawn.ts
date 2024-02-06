import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import type { Color } from "../color"
import type Square from "../../square/square"

export default class Pawn extends Piece implements Piece_Interface {
    
    current_move_distance: number = 2
    minimum_move_distance: number = 1

    // Attacking distance
    move_distance: number = 1
    // Attacking directions
    directions: PieceDirections[]

    movement_directions: PieceDirections[] = [PieceDirections.north]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
        this.directions = [
            PieceDirections.north_east,
            PieceDirections.north_west,
        ]

    }

    public calculate_possible_moves(): void {
        this.grid_point = SquareGrid.point_by_piece(this)

        this.movement_directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.build_possible_moves_list(this.grid_point!, this.current_move_distance, piece_direction_modifier(PieceDirections.north))
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.current_move_distance = this.minimum_move_distance
            this.possible_moves = []
            resolve()
        })
    }
}