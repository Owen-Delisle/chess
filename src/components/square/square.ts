import type { Color } from "./color";
import { SquareID } from "./square_id"
import type Piece from "../piece/piece";

export default class Square extends HTMLElement {
    square_id: SquareID
    color: Color
    piece?: Piece

    constructor(color: Color, square_id: number, piece?: Piece) {
        super();
        this.square_id = SquareID.posAtIndex(square_id)
        this.color = color

        if (piece !== undefined) {
            this.piece = piece
        }
    }

    async build_clickable_square() {
        await this.append_children()
        this.add_event_listener()
    }

    append_children(): Promise<void> {
        return new Promise(resolve => {
            let div_node: Element = document.createElement("div")
            div_node.className = `${this.color}`
            div_node.id = `${this.square_id}`
            
            let p_node: Element = document.createElement("p")
            p_node.className = 'p'
            p_node.innerHTML = `${this.square_id}`

            div_node.appendChild(p_node)
            div_node.appendChild(this.innerSquareImage())

            this.appendChild(div_node)
            resolve()
        })
    }

    private add_event_listener() {
        let square_element = document.getElementById(`${this.square_id}`)    
        square_element?.addEventListener("click", this.handle_click.bind(this))
    }

    handle_click() {
        console.log(`${this.square_id}`)
    }

    private innerSquareImage(): HTMLImageElement {
        if (this.piece != undefined) return this.piece?.image
        else return new Image()
    }
}

// Register the custom element
customElements.define('square-element', Square);