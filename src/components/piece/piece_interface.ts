export default interface Piece_Interface {
	move_distance: number
	piece_value: number

	calculate_possible_moves(): void
}
