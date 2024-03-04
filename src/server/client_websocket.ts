import { UUID } from 'crypto'
import ActiveUsersMessage from './messages/active_users_message'
import GameRequestMessage from './messages/game_request_message'
import Message from './messages/message'
import htmx from 'htmx.org'

export default class ClientWebSocket {
    static token = localStorage.getItem('jwtToken')

    //TODO:: MAKE LOCALHOST PORT A PUBLIC VAR
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`)

    public static open_connection(): void {
        ClientWebSocket.web_socket.addEventListener('open', function (event) {
            console.log('Client WebSocket connection established')
        })
        
        ClientWebSocket.web_socket.addEventListener('message', function (event) {
            console.log('Event from WSS:', event.data)
            const message = JSON.parse(event.data)
            const message_type: string = message.type

            if (message_type === ActiveUsersMessage.json_key) {
                console.log('ACTIVE USERS MESSAGE RECIEVED')
                const active_users = message.users

                ClientWebSocket.update_active_users_list_ui(active_users)
            }

            if(message_type === '69') {
                console.log("WHO DARES:", message.requesting_user)
                console.log("AND WHAT DOTH HE PROTEST:", message.request)
                ClientWebSocket.update_request_list_ui(message.requesting_user)
            }
        })
    }

    public static send_message(message: Message) {
        const message_to_send = JSON.stringify(message)
        ClientWebSocket.web_socket.send(message_to_send)
    }

    private static update_active_users_list_ui(active_users_id: string[]) {
        const user_list_element: HTMLElement | null = document.getElementById('user_list')
        if(!user_list_element) {
            throw new Error('USERS LIST ELEMENT NOT FOUND')
        }

        user_list_element.innerHTML = ''

        active_users_id.forEach(user_id => {
            const list_item = document.createElement('li')
            const typed_user_id: UUID = user_id as UUID
            list_item.textContent = typed_user_id
            list_item.addEventListener('click', function() {
                ClientWebSocket.send_message(new GameRequestMessage(typed_user_id))
            })
            user_list_element.appendChild(list_item)
        })
    
        htmx.trigger(user_list_element, 'htmx:afterSwap', {detail:undefined})
    }

    private static update_request_list_ui(user_id_of_requester: UUID) {
        console.log("UPDATING REQUEST LIST")
        const game_request_list_element: HTMLElement | null = document.getElementById('game_request_list')
        if(!game_request_list_element) {
            throw new Error('GAME REQUEST ELEMENT LIST NOT FOUND')
        }

        game_request_list_element.innerHTML = ''

        const list_item = document.createElement('li')
        list_item.textContent = user_id_of_requester
        // list_item.addEventListener('click', function() {
        //     ClientWebSocket.send_message(new GameRequestMessage(typed_user_id))
        // })
        game_request_list_element.appendChild(list_item)
    
        htmx.trigger(game_request_list_element, 'htmx:afterSwap', {detail:undefined})
    }
}