import MessageStyles from "./styles"

export default class WaitingElement extends HTMLElement {
    
    cancel_game_request: Function
    constructor(cancel_game_request: Function) {
        super()

        this.cancel_game_request = cancel_game_request
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('game-request-wrapper')

        // Header title element
        const header = document.createElement('h2')
        header.textContent = "Waiting for Game Request Response"
        header.classList.add('header')

        // Title in the centre of the square
        const title = document.createElement('h3')
        title.textContent = `Waiting...`
        title.classList.add('title')

        const cancel_button = document.createElement('button')
        cancel_button.textContent = 'Cancel'
        cancel_button.onclick = () => {
            this.cancel_game_request()
            this.remove_children_from_message_container()
        }

        cancel_button.classList.add('button', 'cancel')

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(title)
        wrapper.appendChild(cancel_button)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())

        // Append wrapper to shadow DOM
        this.shadowRoot?.appendChild(wrapper)
    }

    private remove_children_from_message_container(): void {
        const message_container = document.getElementById("message_container")

        if(!message_container) {
            throw new Error("MESSAGE CONTAINER NOT FOUND")
        }

        while(message_container?.firstChild) {
            message_container.removeChild(message_container.firstChild)
        }
    }
}

// Define the custom element
customElements.define('waiting-element', WaitingElement)