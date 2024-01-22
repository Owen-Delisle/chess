import Piece from "../piece"
import type Piece_Interface from "../piece_interface"
import type { PieceType } from "../piece_types"

export default class Queen extends Piece implements Piece_Interface {
    constructor(title: string, pos: string, svg: string, type: PieceType) {
        super(title, pos, svg)
        this.type = type
    }
    public calculate_possible_moves(): void {
        console.log("Queen Piece")
    }
}