import TestView from './tests/test_view'
import { GameType } from './controllers/game_controller'
import { GameController } from './controllers/game_controller'
import WSSController from './server/controllers/wss_controller'
import LoginController from './server/controllers/login_controller'

export default class Index extends HTMLElement {
	// private static test_view: TestView = new TestView()

	constructor() {
		super()
	}

	connectedCallback() {
		LoginController.add_login_submit_listener()
		this.render()
	}

	render() {
		WSSController.open_coneection()
	}
}

// Register the custom element
customElements.define('index-element', Index)
