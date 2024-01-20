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

export class InitialPieces {
    king_b: Piece
    king_w: Piece
    queen_b: Piece
    queen_w: Piece

    bishop_b1: Piece
    bishop_w1: Piece
    bishop_b2: Piece
    bishop_w2: Piece

    knight_b1: Piece
    knight_w1: Piece
    knight_b2: Piece
    knight_w2: Piece

    rook_b1: Piece
    rook_w1: Piece
    rook_b2: Piece
    rook_w2: Piece

    pawn_b1: Piece
    pawn_w1: Piece
    pawn_b2: Piece
    pawn_w2: Piece
    pawn_b3: Piece
    pawn_w3: Piece
    pawn_b4: Piece
    pawn_w4: Piece
    pawn_b5: Piece
    pawn_w5: Piece
    pawn_b6: Piece
    pawn_w6: Piece
    pawn_b7: Piece
    pawn_w7: Piece
    pawn_b8: Piece
    pawn_w8: Piece

    pieceList: Piece[]

    constructor() {
        this.king_b = new Piece("king_b", "H5", King_B_SVG)
        this.king_w = new Piece("king_w", "A5", King_W_SVG)
        this.queen_b = new Piece("queen_b", "H4", Queen_B_SVG)
        this.queen_w = new Piece("queen_w", "A4", Queen_W_SVG)

        this.bishop_b1 = new Piece("bishop_b1", "H3", Bishop_B_SVG)
        this.bishop_w1 = new Piece("bishop_w1", "A3", Bishop_W_SVG)
        this.bishop_b2 = new Piece("bishop_b2", "H6", Bishop_B_SVG)
        this.bishop_w2 = new Piece("bishop_w2", "A6", Bishop_W_SVG)

        this.knight_b1 = new Piece("knight_b1", "H2", Knight_B_SVG)
        this.knight_w1 = new Piece("knight_w1", "A2", Knight_W_SVG)
        this.knight_b2 = new Piece("knight_b2", "H7", Knight_B_SVG)
        this.knight_w2 = new Piece("knight_w2", "A7", Knight_W_SVG)

        this.rook_b1 = new Piece("rook_b", "H1", Rook_B_SVG)
        this.rook_w1 = new Piece("rook_w", "A1", Rook_W_SVG)
        this.rook_b2 = new Piece("rook_b", "H8", Rook_B_SVG)
        this.rook_w2 = new Piece("rook_w", "A8", Rook_W_SVG)

        this.pawn_b1 = new Piece("pawn_b1", "G1", Pawn_B_SVG)
        this.pawn_w1 = new Piece("pawn_w1", "B1", Pawn_W_SVG)
        this.pawn_b2 = new Piece("pawn_b2", "G2", Pawn_B_SVG)
        this.pawn_w2 = new Piece("pawn_w2", "B2", Pawn_W_SVG)
        this.pawn_b3 = new Piece("pawn_b3", "G3", Pawn_B_SVG)
        this.pawn_w3 = new Piece("pawn_w3", "B3", Pawn_W_SVG)
        this.pawn_b4 = new Piece("pawn_b4", "G4", Pawn_B_SVG)
        this.pawn_w4 = new Piece("pawn_w4", "B4", Pawn_W_SVG)
        this.pawn_b5 = new Piece("pawn_b5", "G5", Pawn_B_SVG)
        this.pawn_w5 = new Piece("pawn_w5", "B5", Pawn_W_SVG)
        this.pawn_b6 = new Piece("pawn_b6", "G6", Pawn_B_SVG)
        this.pawn_w6 = new Piece("pawn_w6", "B6", Pawn_W_SVG)
        this.pawn_b7 = new Piece("pawn_b7", "G7", Pawn_B_SVG)
        this.pawn_w7 = new Piece("pawn_w7", "B7", Pawn_W_SVG)
        this.pawn_b8 = new Piece("pawn_b8", "G8", Pawn_B_SVG)
        this.pawn_w8 = new Piece("pawn_w8", "B8", Pawn_W_SVG)

        this.pieceList = [
            this.king_b,
            this.king_w,
            this.queen_b,
            this.queen_w,

            this.bishop_b1,
            this.bishop_w1,
            this.bishop_b2,
            this.bishop_w2,

            this.knight_b1,
            this.knight_w1,
            this.knight_b2,
            this.knight_w2,

            this.rook_b1,
            this.rook_w1,
            this.rook_b2,
            this.rook_w2,

            this.pawn_b1,
            this.pawn_w1,
            this.pawn_b2,
            this.pawn_w2,
            this.pawn_b3,
            this.pawn_w3,
            this.pawn_b4,
            this.pawn_w4,
            this.pawn_b5,
            this.pawn_w5,
            this.pawn_b6,
            this.pawn_w6,
            this.pawn_b7,
            this.pawn_w7,
            this.pawn_b8,
            this.pawn_w8
        ]
    }
}