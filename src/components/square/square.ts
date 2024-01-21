import type { Color } from "./color";
import { SquareID } from "./square_id"
import Styles from "../piece/styles";
import { PieceList } from "../piece/piece_list";

export default class Square extends HTMLElement {
    square_id: SquareID
    color: Color
    constructor(color: Color, square_id: number) {
        super();
        this.square_id = new SquareID(square_id)
        this.color = color
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.render_square_with_piece()
    }

    render_square_with_piece(): void {
        let piece_styles = new Styles()
        this.innerHTML = `
        ${piece_styles.piece}
        <div class="${this.color}" 
        id="${this.square_id.pos}"
        <p>${this.square_id.pos}</p>
        ${PieceList.pieceImageAtPosition(this.square_id.pos)}
        </div>
        `
    }
}

// Register the custom element
customElements.define('square-element', Square);