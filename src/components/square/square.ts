import type { Color } from "./color";
import { SquareID } from "./square_id"
import type Piece from "../piece/piece";
import Styles from "../piece/styles";
import { InitialPieces } from "../piece/initial_pieces";

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
        
        let initial_pieces: InitialPieces = new InitialPieces()
        let piece_list: Piece[] = initial_pieces.pieceList
        let piece_styles = new Styles()

        this.innerHTML = `
        ${piece_styles.piece}
        <div class="${this.color}" id="${this.square_id.id}">
        <p>${this.square_id.id}</p>
        ${initial_pieces.updatePiecePositions(piece_list, this.square_id.id)}
        </div>
      `
    }
}

// Register the custom element
customElements.define('square-element', Square);