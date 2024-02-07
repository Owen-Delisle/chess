import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import type { Color } from "../color"
import type Square from "../../square/square"
import SquareID from "../../../components/square/square_id"

export default class Pawn extends Piece implements Piece_Interface {

    current_move_distance: number = 2
    minimum_move_distance: number = 1
    movement_directions: PieceDirections[] = [PieceDirections.north]

    attack_directions: PieceDirections[] = [PieceDirections.north_east, PieceDirections.north_west]

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, pos, svg, color)
        this.type = type
    }

    public calculate_possible_moves(): void {
        this.grid_point = SquareGrid.point_by_piece(this)
        
        this.build_possible_moves_list(this.grid_point!, this.current_move_distance, piece_direction_modifier(PieceDirections.north))
        
        this.build_possible_attack_list()
    }

    private build_possible_attack_list(): void {
        this.attack_directions.forEach(direction => {
            const next_row: number = this.grid_point!.row + piece_direction_modifier(direction).row
            const next_col: number = this.grid_point!.col + piece_direction_modifier(direction).col

            const piece_at_attack_point: Piece | undefined = SquareGrid.piece_by_grid_point({row: next_row, col: next_col})

            if (piece_at_attack_point !== undefined) {
                if(piece_at_attack_point.color !== this.color) {
                    this.possible_moves.push(SquareID.pos_at_point({row: next_row, col: next_col}))
                }
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