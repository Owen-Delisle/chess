import ClientWebSocket from "../../server/client_websocket"

export default class DOMElementObserver {
	el: HTMLElement | null
	mutation_observer: MutationObserver
	observer_config: ElementObserverConfig

	constructor(el_id: string, config: ElementObserverConfig) {
		this.el = document.getElementById(el_id)
		if (!this.el) {
			throw new Error(`Observer could not find Element ${el_id}`)
		}

		this.mutation_observer = this.create_mutation_observer()
		this.observer_config = config
    }

	private create_mutation_observer(): MutationObserver {
		return new MutationObserver((mutation_list, observer) => {
			mutation_list.forEach(mutation => {
				if (mutation.type === 'childList') {
					console.log('Youre just to pretty to delete Mr. Observer')
				}
			})
		})
	}

	public observe_element() {
		if(!this.el) {
			throw new Error("Cannot observe element that is null")
		}
		this.mutation_observer.observe(this.el, this.observer_config)
		console.log("OBSERVING ELEMENT")
	}
}

export type ElementObserverConfig = {
	attributes: boolean
	childList: boolean
	subtree: boolean
}
