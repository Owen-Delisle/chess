import { get_element_by_id } from "../../ui/utils/funcs"
import MessageStyles from "./styles"

export default class DrawDeclinedElement extends HTMLElement {
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
        const header = document.createElement('h1')
        header.textContent = "Draw Declined"
        header.classList.add('header')


        // Append elements to wrapper
        wrapper.appendChild(header)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())
        this.shadowRoot?.appendChild(MessageStyles.shadow_styles())
        this.shadowRoot?.appendChild(wrapper)

        setTimeout(() => {
            const message_container = get_element_by_id('message_container')
            message_container.removeChild(this)
        }, 1000);
    }
}

// Define the custom element
customElements.define('draw-declined-element', DrawDeclinedElement)