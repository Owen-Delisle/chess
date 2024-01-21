import type Square from "src/components/square/square"
import  PieceList from "../components/piece/piece_list"

export default class PieceListController {
    public static target_square: Square

    public static pieceImageAtPosition(pos: string): string {
        let image: string = ""
        PieceList.pieceList.forEach(piece => {
            if (piece.pos === pos) {
                image = piece.image
            }
        })
        return image
    }

    public static updateTargetSquare(square: Square): void {
        PieceListController.target_square = square
    }

    public static updatePiecePosition(square_pos: string, new_pos: string): void {
        PieceList.pieceList.forEach(piece => {
            if (piece.pos === square_pos) {
                console.log(piece.title)
                piece.pos = new_pos
            }
        })
    }
}