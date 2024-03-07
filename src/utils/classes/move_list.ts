import { Move } from "../../global_types/move";
import Piece from "../../components/piece/piece";

export default class MoveList {
    private moves: Move[] = [];
  
    constructor() {}
  
    add_move(move: Move): void {
      this.moves.push(move);
    }
  
    remove_last_move(): void {
      this.moves.pop();
    }
  
    last_move(): { piece: Piece, from: string, to: string } | undefined {
      if (this.moves.length === 0) {
        return undefined;
      }
      return this.moves[this.moves.length - 1];
    }
  }