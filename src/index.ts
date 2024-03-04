import TestView from './tests/test_view'
import ClientWebSocket from './server/client_websocket'
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
		console.log("INDEXXICLE")
		ClientWebSocket.open_connection()
	}
}

// Register the custom element
customElements.define('index-element', Index)
