import { Color } from "../components/piece/color";
export class GameController {
    public static turn = Color.white

    public static switch_turn(): void {
        if(GameController.turn == Color.white) {
            GameController.turn = Color.black
        } else {
            GameController.turn = Color.white
        }
    }
}