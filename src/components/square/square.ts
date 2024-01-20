import type { Color } from "./color";
export default class Square extends HTMLElement {
    square_id: number
    color: Color
    constructor(color: Color, square_id: number) {
        super();
        this.square_id = square_id
        this.color = color
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="${this.color}"><p>${this.square_id}</p></div>
      `
    }
}

// Register the custom element
customElements.define('square-element', Square);