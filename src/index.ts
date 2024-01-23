import Board from './components/board/board'

export default class Index extends HTMLElement {
	public static board: Board = new Board()
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.appendChild(Index.board)
	}
}

// Register the custom element
customElements.define('index-element', Index);
