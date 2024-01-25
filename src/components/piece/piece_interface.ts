import type { GridPoint } from "../../global_types/grid_point"
import type { PieceDirections } from "./piece_directions"

export default interface Piece_Interface {
    move_distance: number
    
    calculate_possible_moves(current_pos: GridPoint): GridPoint[] | undefined

    possible_moves_arr(current_pos: GridPoint): GridPoint[]
}