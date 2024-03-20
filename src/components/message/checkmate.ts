import MessageStyles from "./styles"

export default class CheckmateElement extends HTMLElement {
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
        header.textContent = "Game Over"
        header.classList.add('header')

        // Title in the centre of the square
        const title = document.createElement('h2')
        title.textContent = `Checkmate`
        title.className = 'header'

        const close_button = document.createElement('button')
        close_button.textContent = 'Close'
        close_button.onclick = () => {            
            window.location.reload()
        }

        close_button.className = 'message_button'

        // Append elements to wrapper
        wrapper.appendChild(header)
        wrapper.appendChild(title)
        wrapper.appendChild(close_button)

        wrapper.className = 'request_message'

        this.appendChild(MessageStyles.square_style())
        this.shadowRoot?.appendChild(MessageStyles.shadow_styles())
        this.shadowRoot?.appendChild(wrapper)
    }
}

// Define the custom element
customElements.define('checkmate-element', CheckmateElement)