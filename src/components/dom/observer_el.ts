import DOMElementObserver from "../../utils/dom/observer"

export default class ObserverElement extends HTMLElement {
    public move_list_observer: DOMElementObserver 
	constructor() {
        super()
        console.log("CONSTRUCTOR")
        this.move_list_observer = new DOMElementObserver('moves_list', {attributes: false, childList: true, subtree: true}) 
	}

	connectedCallback() {
		this.render()
	}

	render() {
        this.move_list_observer.observe_element()
	}
}

// Register the custom element
customElements.define('observer-element', ObserverElement)