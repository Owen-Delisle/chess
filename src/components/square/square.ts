import type { Color } from "./color";
import SquareID  from "./square_id"
import type Piece from "../piece/piece";
import MoveController from "../../controllers/move_controller";
import type { GridPoint } from "../../global_types/grid_point";
import PieceList from "../piece/piece_list";

export default class Square extends HTMLElement {
    square_id: string
    color: Color
    element: HTMLElement | null = null
    grid_point: GridPoint

    constructor(color: Color, square_id: number) {
        super();
        this.square_id = SquareID.pos_at_index(square_id)
        this.color = color
        this.grid_point = SquareID.point_at_index(square_id)
    }

    async build_clickable_square() {
        await this.append_children()
        this.element = document.getElementById(`${this.square_id}`);
        this.add_event_listener()
    }

    private append_children(): Promise<void> {
        return new Promise(async resolve => {
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
        let piece: Piece | undefined = this.piece_attached_to_square()
        if (piece != undefined) return piece.image
        else return new Image()
    }

    public is_empty(): boolean {
        return this.piece_attached_to_square() == undefined
    }

    public piece_attached_to_square(): Piece | undefined {
        const position: string = this.square_id as string
        return PieceList.piece_by_position(position)
    }

    public add_border(): void {
        if(this.element != undefined) {
            this.element.style.border = "thick solid #0000FF";
        }
    }

    public remove_border(): void {
        if(this.element != undefined) {
            this.element.style.border = "";
        }
    }

    public add_dot(): void {
        const node = document.createElement("span")
        node.className = "dot"
        node.id = `${this.square_id}-dot`
        if(this.element != undefined) {
            this.element!.appendChild(node)
        }
    }

    public remove_dot(): void {
        const node: HTMLElement | null = document.getElementById(`${this.square_id}-dot`)
        if(node !== null) {
            this.element!.removeChild(node)
        }
    }

    public remove_piece(): void {
        let piece: Piece | undefined = this.piece_attached_to_square()
        if(piece != undefined) PieceList.remove_piece_by_id(piece.title)
    }
}

// Register the custom element
customElements.define('square-element', Square);