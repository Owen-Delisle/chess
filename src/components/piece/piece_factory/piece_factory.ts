import Piece from '../piece';
import { PieceType } from '../piece_types';
import { Color } from '../color';

import Bishop from '../pieces/bishop'
import King from '../pieces/king'
import Knight from '../pieces/knight'
import Pawn from '../pieces/pawn'
import Queen from '../pieces/queen'
import Rook, { RookType } from '../pieces/rook'

import Bishop_B_SVG from './assets/bishop-b.svg'
import Bishop_W_SVG from './assets/bishop-w.svg'
import King_B_SVG from './assets/king-b.svg';
import King_W_SVG from './assets/king-w.svg'
import Knight_B_SVG from './assets/knight-b.svg'
import Knight_W_SVG from './assets/knight-w.svg'
import Pawn_B_SVG from './assets/pawn-b.svg'
import Pawn_W_SVG from './assets/pawn-w.svg'
import Queen_B_SVG from './assets/queen-b.svg'
import Queen_W_SVG from './assets/queen-w.svg'
import Rook_B_SVG from './assets/rook-b.svg'
import Rook_W_SVG from './assets/rook-w.svg'

export default function piece_factory(id: string, position: string, type: PieceType, color: Color, rook_type?: RookType): Piece {
        switch (type) {
            case PieceType.bishop:
                return new Bishop(id, position, color === Color.black ? Bishop_B_SVG : Bishop_W_SVG, type, color);
            case PieceType.king:
                return new King(id, position, color === Color.black ? King_B_SVG : King_W_SVG, type, color);
            case PieceType.knight:
                return new Knight(id, position, color === Color.black ? Knight_B_SVG : Knight_W_SVG, type, color);
            case PieceType.pawn:
                return new Pawn(id, position, color === Color.black ? Pawn_B_SVG : Pawn_W_SVG, type, color);
            case PieceType.queen:
                return new Queen(id, position, color === Color.black ? Queen_B_SVG : Queen_W_SVG, type, color);
            case PieceType.rook:
                if(rook_type !== undefined) {
                    return new Rook(id, position, color === Color.black ? Rook_B_SVG : Rook_W_SVG, type, color, rook_type!);
                } else {
                    throw new Error('rook_type was not defined')
                }
            default:
                throw new Error(`Unsupported piece type: ${type}`);
        }
    }