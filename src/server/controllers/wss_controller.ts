import Message from '../components/message';
import htmx from 'htmx.org'

export default class WSSController {
    static token = localStorage.getItem('jwtToken');
    //TODO:: MAKE LOCALHOST PORT A VAR
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`);

    public static open_connection(): void {
        WSSController.web_socket.addEventListener('open', function (event) {
            console.log('WebSocket connection established');
        });
        
        WSSController.web_socket.addEventListener('message', function (event) {
            console.log('Event from WSS:', event.data);
            const message = JSON.parse(event.data);
            if (message.type === 'active_users') {
                console.log('ACTIVE USERS MESSAGE RECIEVED')
                console.log("MESSAGE", message)
                const activeUsers = message.users;
                // Update UI with the updated active user list
                WSSController.updateActiveUsersUI(activeUsers);
            }
        });
    }

    public static send_message(message: Message) {
        const message_to_send = JSON.stringify(message)
        WSSController.web_socket.send(message_to_send);
    }

    private static updateActiveUsersUI(activeUsers: string[]) {
        const user_list_element: HTMLElement | null = document.getElementById('user_list');
        if(!user_list_element) {
            throw new Error('USERS LIST NOT FOUND')
        }

        user_list_element.innerHTML = ''; // Clear existing user list
    
        activeUsers.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user;
            user_list_element.appendChild(listItem);
        });
    
        // Trigger htmx to process any new elements added to the user list
        htmx.trigger(user_list_element, 'htmx:afterSwap', {detail:undefined});
    }
}