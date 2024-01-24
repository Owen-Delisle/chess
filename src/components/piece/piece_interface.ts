import type { PieceDirections } from "./piece_directions"

export default interface Piece_Interface {
    largest_move_distance: number
    directions: PieceDirections[]
    
    calculate_possible_moves(): void
}