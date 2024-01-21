import type { Color } from "./color";
import { SquareID } from "./square_id"
import Styles from "../piece/styles";
import PieceListController from "../../controllers/piece_list_controller";
import type Piece from "../piece/piece";

export default class Square extends HTMLElement {
    square_id: SquareID
    color: Color
    piece?: Piece

    constructor(color: Color, square_id: number, piece?: Piece) {
        super();
        this.square_id = SquareID.posAtIndex(square_id)
        this.color = color
        
        if(piece !== undefined) {
            this.piece = piece
        }

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
        id="${this.square_id}"
        <p>${this.square_id}</p>
        ${this.innerSquareImage()}
        </div>
        `
    }

    private innerSquareImage(): string | undefined {
        if(this.piece != undefined) return this.piece?.image
        else return ""
    }

    public static clickHandler() {

    }
}

// Register the custom element
customElements.define('square-element', Square);