import { get_element_by_id } from "../../ui/utils/funcs"
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
        header.textContent = "Game Requested"
        header.className = "header"

        // Title in the centre of the square
        const title = document.createElement('h3')
        this.waiting_animation(title)
        title.className = "header"

        const cancel_button = document.createElement('button')
        cancel_button.textContent = 'Cancel'
        cancel_button.className = 'message_button'

        cancel_button.onclick = () => {
            this.cancel_game_request()
            this.remove_children_from_message_container()
        }

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(title)
        wrapper.appendChild(cancel_button)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())
        this.shadowRoot?.appendChild(MessageStyles.shadow_styles())
        this.shadowRoot?.appendChild(wrapper)
    }

    private remove_children_from_message_container(): void {
        const message_container = document.getElementById("message_container")

        if (!message_container) {
            throw new Error("MESSAGE CONTAINER NOT FOUND")
        }

        while (message_container?.firstChild) {
            message_container.removeChild(message_container.firstChild)
        }
    }

    private waiting_animation(waiting_message: HTMLElement): void {
        let count = 0

        const animate = () => {
            switch (count) {
                case 0:
                    waiting_message.textContent = 'Waiting'
                    break
                case 1:
                    waiting_message.textContent = 'Waiting.'
                    break
                case 2:
                    waiting_message.textContent = 'Waiting..'
                    break
                case 3:
                    waiting_message.textContent = 'Waiting...'
                    count = -1
                    break
            }

            count++
            setTimeout(animate, 400)
        }

        animate()
    }
}

// Define the custom element
customElements.define('waiting-element', WaitingElement)