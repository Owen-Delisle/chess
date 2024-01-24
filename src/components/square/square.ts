import type { Color } from "./color";
import SquareID  from "./square_id"
import type Piece from "../piece/piece";
import MoveController from "../../controllers/move_controller";
import type { GridPoint } from "../../global_types/grid_point";

export default class Square extends HTMLElement {
    square_id: SquareID
    color: Color
    piece?: Piece
    element: HTMLElement | null = null
    grid_point: GridPoint

    constructor(color: Color, square_id: number, piece?: Piece) {
        super();
        this.square_id = SquareID.pos_at_index(square_id)
        this.color = color
        this.grid_point = SquareID.point_at_index(square_id)

        if (piece !== undefined) {
            this.piece = piece
        }
    }

    async build_clickable_square() {
        await this.append_children()

        this.element = await (() => {
            return document.getElementById(`${this.square_id}`)
        })()

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
            div_node.appendChild(this.piece_image())

            this.appendChild(div_node)
            resolve()
        })
    }

    private add_event_listener() {  
        this.element?.addEventListener("click", this.handle_click.bind(this))
    }

    private handle_click() {
        MoveController.on_square_click(this)
    }

    private piece_image(): HTMLImageElement {
        if (this.piece != undefined) return this.piece?.image
        else return new Image()
    }

    public add_border(): void {
        this.element!.style.border = "thick solid #0000FF";
    }

    public remove_border(): void {
        this.element!.style.border = "";
    }

    public add_dot(): void {
        const node = document.createElement("span")
        node.className = "dot"
        node.id = `${this.square_id}-dot`
        this.element!.appendChild(node)
    }

    public remove_dot(): void {
        const node = document.getElementById(`${this.square_id}-dot`)
        if(node !== null) {
            this.element!.removeChild(node)
        }
    }
}

// Register the custom element
customElements.define('square-element', Square);