import TestView from './tests/test_view'
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
		console.log("INDEXXICLE")
		WSSController.open_connection()
	}
}

// Register the custom element
customElements.define('index-element', Index)
