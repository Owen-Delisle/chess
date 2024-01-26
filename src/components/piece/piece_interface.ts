import type { GridPoint } from "../../global_types/grid_point"

export default interface Piece_Interface {
    move_distance: number
    
    calculate_possible_moves(): GridPoint[] | undefined
}