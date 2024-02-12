import Piece from "../../src/components/piece/piece"
import { Color } from "../../src/components/piece/color";

test('Test piece constructor properties to be equal', () => {
    const title = "test_piece"
    const position = "A1"
    const svg = "unsure.svg"
    const color = Color.white

    const test_piece: Piece = new Piece(title, position, svg, color)
});