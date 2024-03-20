import { UUID } from "crypto"
import MessageStyles from "./styles"
import UserAPI from "../../server/api/user_api"

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

    async render() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('game-request-wrapper')

        // Header title element
        const header = document.createElement('h2')
        header.textContent = 'Game Requested'
        header.className = 'header'

        // Title in the centre of the square
        const title = document.createElement('h3')
    
        const username: string | undefined = await UserAPI.username_from_id(this.requester_id)
        if(!username) {
            throw new Error("Could not query username")
        }

        title.textContent = `Game request from: ${username}`
        title.className = "header"

        // Buttons
        const acceptButton = document.createElement('button')
        acceptButton.textContent = 'Accept'
        acceptButton.className = "message_button"
        
        acceptButton.onclick = () => {
            this.accept_game_function()
            this.remove_children_from_message_container()
        }

        const declineButton = document.createElement('button')
        declineButton.textContent = 'Decline'
        declineButton.onclick = () => {
            this.decline_game_function()

            const message_container = document.getElementById("message_container")
            if(!message_container) {
                throw new Error("MESSAGE CONTAINER NOT FOUND")
            }
            message_container.removeChild(this)
        }

        declineButton.className = 'message_button'

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(title)
        wrapper.appendChild(acceptButton)
        wrapper.appendChild(declineButton)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())
        this.shadowRoot?.appendChild(MessageStyles.shadow_styles())
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