import PieceList from "../../models/piece_list"
import MessageStyles from "./styles"
import default_piece_list from "../../models/default_piece_list"
import Board from "../board/board"

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
        const header = document.createElement('h2')
        header.textContent = "Game Over"
        header.classList.add('header')

        // Title in the centre of the square
        const title = document.createElement('h3')
        title.textContent = `Checkmate`
        title.classList.add('title')

        const cancel_button = document.createElement('button')
        cancel_button.textContent = 'Close'
        cancel_button.onclick = () => {
            this.remove_children_from_message_container()
            
            //TODO: MAKE FUNCTION
            const board_container = document.getElementById("board_element_container")
            if(!board_container) {
                throw new Error("Board Container Element not Found")
            }
            board_container.innerHTML = '<board-element id="default_board" game_type="offline" player_color="white" opponent_user_id="none"></board-element>'
            // PieceList.piece_list = default_piece_list
            Board.singleton.redraw()
            //END TODO
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

    //MAKE GLOBAL FUNCTION
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
customElements.define('checkmate-element', CheckmateElement)