import Piece from "./piece"

import Bishop_B_SVG from "./assets/bishop-b.svg"
import Bishop_W_SVG from "./assets/bishop-w.svg"
import King_B_SVG from "./assets/king-b.svg"
import King_W_SVG from "./assets/king-w.svg"
import Knight_B_SVG from "./assets/knight-b.svg"
import Knight_W_SVG from "./assets/knight-w.svg"
import Pawn_B_SVG from "./assets/pawn-b.svg"
import Pawn_W_SVG from "./assets/pawn-w.svg"
import Queen_B_SVG from "./assets/queen-b.svg"
import Queen_W_SVG from "./assets/queen-w.svg"
import Rook_B_SVG from "./assets/rook-b.svg"
import Rook_W_SVG from "./assets/rook-w.svg"

export class PieceList {
    public static pieceList: Piece[] = [
        new Piece("king_b", "D8", King_B_SVG),
        new Piece("king_w", "D1", King_W_SVG),

        new Piece("queen_b", "E8", Queen_B_SVG),
        new Piece("queen_w", "E1", Queen_W_SVG),

        new Piece("bishop_b1", "C8", Bishop_B_SVG),
        new Piece("bishop_w1", "C1", Bishop_W_SVG),
        new Piece("bishop_b2", "F8", Bishop_B_SVG),
        new Piece("bishop_w2", "F1", Bishop_W_SVG),

        new Piece("knight_b1", "B8", Knight_B_SVG),
        new Piece("knight_w1", "B1", Knight_W_SVG),
        new Piece("knight_b2", "G8", Knight_B_SVG),
        new Piece("knight_w2", "G1", Knight_W_SVG),

        new Piece("rook_b1", "A8", Rook_B_SVG),
        new Piece("rook_w1", "A1", Rook_W_SVG),
        new Piece("rook_b2", "H8", Rook_B_SVG),
        new Piece("rook_w2", "H1", Rook_W_SVG),

        new Piece("pawn_b1", "A7", Pawn_B_SVG),
        new Piece("pawn_w1", "A2", Pawn_W_SVG),
        new Piece("pawn_b2", "B7", Pawn_B_SVG),
        new Piece("pawn_w2", "B2", Pawn_W_SVG),
        new Piece("pawn_b3", "C7", Pawn_B_SVG),
        new Piece("pawn_w3", "C2", Pawn_W_SVG),
        new Piece("pawn_b4", "D7", Pawn_B_SVG),
        new Piece("pawn_w4", "D2", Pawn_W_SVG),
        new Piece("pawn_b5", "E7", Pawn_B_SVG),
        new Piece("pawn_w5", "E2", Pawn_W_SVG),
        new Piece("pawn_b6", "F7", Pawn_B_SVG),
        new Piece("pawn_w6", "F2", Pawn_W_SVG),
        new Piece("pawn_b7", "G7", Pawn_B_SVG),
        new Piece("pawn_w7", "G2", Pawn_W_SVG),
        new Piece("pawn_b8", "H7", Pawn_B_SVG),
        new Piece("pawn_w8", "H2", Pawn_W_SVG),
    ]

    public static updatePiecePosition(piece_id: string, new_position: string) {
        PieceList.pieceList.forEach(piece => {
            if (piece_id === piece.title) {
                piece.pos = new_position
            }
        })
        console.log(PieceList.pieceList)
    }

    public static pieceImageAtPosition(pos: string): string {
        let image: string = ""
        PieceList.pieceList.forEach(piece => {
            if (piece.pos === pos) {
                image = `
                <img src=${piece.svg} 
                class="piece" 
                id="${piece.title}"
                />
                `
            }
        })
        return image
    }

    public static checkIfSquareContainsPiece(pos: string): boolean {
        let containsPiece: boolean = false
        PieceList.pieceList.forEach(piece => {
            if (piece.pos === pos) {
                containsPiece = true
            }
        })
        return containsPiece
    }

    public static pieceAtPosition(pos: string): any {
        let returnValue: any = null
        PieceList.pieceList.forEach(piece => {
            if (piece.pos === pos) {
                returnValue = piece
            }
        })
        return returnValue
    }

}