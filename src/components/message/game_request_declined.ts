import MessageStyles from "./styles"

export default class GameRequestDeclined extends HTMLElement {
    constructor() {
        super()

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
        header.textContent = "Game Request Was Declined"
        header.className = 'header'

        const close_button = document.createElement('button')
        close_button.textContent = 'Close'
        close_button.onclick = () => {
            this.remove_children_from_message_container()
        }

        close_button.className = 'message_button'

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(close_button)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())
        this.shadowRoot?.appendChild(MessageStyles.shadow_styles())
        this.shadowRoot?.appendChild(wrapper)
    }

    //TODO - DUPLICATED, MAKE GLOBAL
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
customElements.define('game-declined-element', GameRequestDeclined)