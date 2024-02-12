import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"
import SquareGrid from "../../../models/square_grid"
import { PieceDirections, piece_direction_modifier } from "../piece_directions"
import type { Color } from "../color"
import type Square from "../../square/square"
import SquareID from "../../../components/square/square_id"
import PieceList from "../../../models/piece_list/piece_list"

export default class Pawn extends Piece implements Piece_Interface {
    private minimum_move_distance: number = 1

    attack_directions: PieceDirections[] = [PieceDirections.north_east, PieceDirections.north_west]

    //Global Property
    public move_distance: number = 2

    constructor(title: string, pos: string, svg: string, type: PieceType, color: Color) {
        super(title, type, pos, svg, color)
        this.type = type

        this.directions = [PieceDirections.north]
    }

    public build_possible_attack_list(): void {
        this.attack_directions.forEach(direction => {
            const next_row: number = SquareGrid.point_at_board_position(this.pos).row + piece_direction_modifier(direction).row
            const next_col: number = SquareGrid.point_at_board_position(this.pos).col + piece_direction_modifier(direction).col

            const piece_at_attack_point: Piece | undefined = SquareGrid.piece_by_grid_point({ row: next_row, col: next_col })

            if(this.conditions_for_adding_attack_square(piece_at_attack_point, next_row, next_col)) {
                this.possible_moves.push(SquareID.pos_at_point({ row: next_row, col: next_col }))
            }
        })
    }

    private conditions_for_adding_attack_square(piece_at_attack_point: Piece | undefined, next_row: number, next_col: number): boolean {
        let should_attack: boolean = true

        if (piece_at_attack_point !== undefined) {
            if (piece_at_attack_point.color === this.color) {
                should_attack = false
            }

            if (Piece.position_restrictions.length > 0) {
                if (!Piece.position_restrictions.includes(SquareID.pos_at_point({ row: next_row, col: next_col }))) {
                    should_attack = false
                }
            }
        } else {
            should_attack = false
        }

        return should_attack
    }

    public move_to(new_square: Square): Promise<void> {
        return new Promise(async resolve => {
            this.pos = new_square.square_id as string
            this.move_distance = this.minimum_move_distance
            this.possible_moves = []

            if(new_square.grid_point.row === 7 || new_square.grid_point.row === 0) {
                this.make_queen()
            }
            
            resolve()
        })
    }

    public make_queen() {
        PieceList.swap_with_queen(this.title, this.pos, this.color)
    }
}