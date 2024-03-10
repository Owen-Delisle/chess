import { UUID } from "crypto"
import MessageStyles from "./styles"

export default class GameRequestElement extends HTMLElement {
    requester_id: UUID
    accept_game_function: Function
    decline_game_function: Function
    constructor(requester_id: UUID, accept_game_function: Function, decline_game_function: Function) {
        super()

        this.requester_id = requester_id
        this.accept_game_function = accept_game_function
        this.decline_game_function = decline_game_function

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
        header.textContent = 'Game Requested'
        header.classList.add('header')

        // Title in the centre of the square
        const title = document.createElement('h3')
        title.textContent = `Game request from: ${this.requester_id}`
        title.classList.add('title')

        // Buttons
        const acceptButton = document.createElement('button')
        acceptButton.textContent = 'Accept'
        acceptButton.classList.add('button', 'accept')
        acceptButton.onclick = () => {
            this.accept_game_function()
            this.remove_children_from_message_container()
        }

        const declineButton = document.createElement('button')
        declineButton.textContent = 'Decline'
        declineButton.onclick = () => {
            this.decline_game_function()
            this.remove_children_from_message_container()
        }

        declineButton.classList.add('button', 'decline')

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(title)
        wrapper.appendChild(acceptButton)
        wrapper.appendChild(declineButton)

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
customElements.define('game-request-element', GameRequestElement)