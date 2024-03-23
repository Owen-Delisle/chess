import { UUID } from "crypto"
import MessageStyles from "./styles"
import ClientWebSocket from "../../server/client_websocket"
import DrawMessage from "../../server/messages/draw_message"
import { instantiate_placeholder_board } from "../../ui/board/board_dom_controller"
import DrawOfferDeclinedMessage from "../../server/messages/draw_offer_declined"

export default class DrawOfferElement extends HTMLElement {
    sender_id: UUID
    constructor(sender_id: UUID) {
        super()

        this.sender_id = sender_id
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
        header.textContent = 'Draw Offered'
        header.className = 'header'

        // Title in the centre of the square
        const title = document.createElement('h3')

        title.textContent = `Draw Offered by opponent`
        title.className = "header"

        // Buttons
        const acceptButton = document.createElement('button')
        acceptButton.textContent = 'Accept'
        acceptButton.className = "message_button"
        
        acceptButton.onclick = () => {
            this.accept_draw_function()
        }

        const declineButton = document.createElement('button')
        declineButton.textContent = 'Decline'
        declineButton.onclick = () => {
            this.decline_draw_function()

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

    private accept_draw_function() {
        ClientWebSocket.send_message_to_server(new DrawMessage(this.sender_id, "Draw was Accepted"))
        instantiate_placeholder_board()
    }

    private decline_draw_function() {
        ClientWebSocket.send_message_to_server(new DrawOfferDeclinedMessage(this.sender_id))
    }
}

// Define the custom element
customElements.define('draw-offer-element', DrawOfferElement)