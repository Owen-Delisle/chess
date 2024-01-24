import type Piece from "./piece"
import {PieceType} from "./piece_types"
import {Color} from "./color"

import Bishop from "./pieces/bishop"
import King from "./pieces/king"
import Knight from "./pieces/knight"
import Pawn from "./pieces/pawn"
import Queen from "./pieces/queen"
import Rook from "./pieces/rook"

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

export default class PieceList {
    public static pieceList: Piece[] = [
        new King("king_b", "D8", King_B_SVG, PieceType.king),
        new King("king_w", "D1", King_W_SVG, PieceType.king),

        new Queen("queen_b", "E8", Queen_B_SVG, PieceType.queen),
        new Queen("queen_w", "E1", Queen_W_SVG, PieceType.queen),

        new Bishop("bishop_b1", "C8", Bishop_B_SVG, PieceType.bishop),
        new Bishop("bishop_w1", "C1", Bishop_W_SVG, PieceType.bishop),
        new Bishop("bishop_b2", "F8", Bishop_B_SVG, PieceType.bishop),
        new Bishop("bishop_w2", "F1", Bishop_W_SVG, PieceType.bishop),

        new Knight("knight_b1", "B8", Knight_B_SVG, PieceType.knight),
        new Knight("knight_w1", "B1", Knight_W_SVG, PieceType.knight),
        new Knight("knight_b2", "G8", Knight_B_SVG, PieceType.knight),
        new Knight("knight_w2", "G1", Knight_W_SVG, PieceType.knight),

        new Rook("rook_b1", "A8", Rook_B_SVG, PieceType.rook),
        new Rook("rook_w1", "A1", Rook_W_SVG, PieceType.rook),
        new Rook("rook_b2", "H8", Rook_B_SVG, PieceType.rook),
        new Rook("rook_w2", "H1", Rook_W_SVG, PieceType.rook),

        new Pawn("pawn_b1", "A7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w1", "A2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b2", "B7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w2", "B2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b3", "C7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w3", "C2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b4", "D7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w4", "D2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b5", "E7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w5", "E2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b6", "F7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w6", "F2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b7", "G7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w7", "G2", Pawn_W_SVG, PieceType.pawn, Color.white),
        new Pawn("pawn_b8", "H7", Pawn_B_SVG, PieceType.pawn, Color.black),
        new Pawn("pawn_w8", "H2", Pawn_W_SVG, PieceType.pawn, Color.white),
    ]

    public static pieceAt(pos: string): Piece | undefined {
        let p: Piece | undefined
        this.pieceList.forEach(piece => {
            if(piece.pos === pos) {
                p = piece
            }
        })
        return p
    }
    
}