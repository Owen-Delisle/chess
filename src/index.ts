import Board from './components/board/board'

export default class Index extends HTMLElement {
	board: Board = new Board()
	constructor() {
		super();
		// this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		// this.board.render()
		// this.innerHTML = `${this.board.innerHTML}`
		console.log("Index Render")
		this.appendChild(this.board)
	}
}

// Register the custom element
customElements.define('index-element', Index);
