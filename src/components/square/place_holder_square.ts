import { BlackOrWhite } from "../../global_types/enums/black_or_white"

export default class PlaceHolderSquare extends HTMLElement {
	color: BlackOrWhite
	element: HTMLElement | null = null
	default_background: string

    constructor(color: BlackOrWhite) {
        super()
        this.color = color
        this.default_background = color === BlackOrWhite.white ? '#D8ECEC' : '#1FE5DF'
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let div_node: Element = document.createElement('div')
        div_node.className = `${this.color}`

        this.appendChild(div_node)
    }
}

customElements.define('placeholder-square-element', PlaceHolderSquare)