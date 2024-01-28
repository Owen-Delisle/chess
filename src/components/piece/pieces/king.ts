import type { GridPoint } from "../../../global_types/grid_point"
import type { Color } from "../color"
import Piece from "../piece"
import { PieceDirections } from "../piece_directions"
import type Piece_Interface from "../piece_interface"
import { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import type Square from "../../../components/square/square"

export default class King extends Piece implements Piece_Interface {
    move_distance: number = 2
    directions: PieceDirections[]
    has_moved: boolean = false

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

    public calculate_possible_moves(): GridPoint[] {
        let possible_moves: GridPoint[] = []
        this.grid_point = SquareGrid.point_by_piece(this)

        this.directions.forEach(direction => {
            switch (direction) {
                case PieceDirections.north:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 0)
                    break;
                case PieceDirections.north_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, 1)
                    break;
                case PieceDirections.east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 0, 1)
                    break;
                case PieceDirections.south_east:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, 1)
                    break;
                case PieceDirections.south:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, 0)
                    break;
                case PieceDirections.south_west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 1, -1)
                    break;
                case PieceDirections.west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, 0, -1)
                    break;
                case PieceDirections.north_west:
                    this.moves_list(this.grid_point!, possible_moves, this.move_distance, -1, -1)
                    break;
                default:
                    console.log("Direction Not Found")
            }
        })
        return possible_moves
    }

    public move_to(new_square: Square) {
        this.pos = new_square.square_id as string
        this.has_moved = true
    }
    
}