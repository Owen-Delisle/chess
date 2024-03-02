import Board from './components/board/board'
import TestView from './tests/test_view'
import { GameType } from './controllers/game_controller'
import { GameController } from './controllers/game_controller'
import WSSController from './server/controllers/wss_controller'
import LoginController from './server/controllers/login_controller'

export default class Index extends HTMLElement {
	// private static test_view: TestView = new TestView()
	// public static board: Board = new Board()

	constructor() {
		super()

		const container = document.createElement('div');
        const board_props = document.createElement('p');
        board_props.id = 'board_props';
        container.appendChild(board_props);
	}

	connectedCallback() {
		LoginController.add_login_submit_listener()
		this.render()
	}

	render() {
		const prop = this.getAttribute('board_props');
		if(!prop) {
			throw new Error("Prop from board is undefined")
		}
		if(!GameType[prop]) {
			throw new Error("Gametype of Prop does not exist")
		}
		GameController.game_type = GameType[prop]
		console.log(GameController.game_type)
		// this.appendChild(Index.board)

		WSSController.open_coneection()
	}
}

// Register the custom element
customElements.define('index-element', Index)
