import Rook from "../components/piece/pieces/rook";
import King from "../components/piece/pieces/king";
import { Move } from "./move";

export type CastleMove = {
    king: King,
    rook: Rook,

    king_move: Move,
    rook_move: Move
}