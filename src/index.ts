import Board from './components/board/board'
import TestView from './tests/test_view'
export default class Index extends HTMLElement {
	// private static test_view: TestView = new TestView()
	public static board: Board = new Board()

	constructor() {
		super()
	}

	connectedCallback() {
		this.render()
	}

	render() {
		this.appendChild(Index.board)
	}
}

// Register the custom element
customElements.define('index-element', Index)
