import { UUID } from 'crypto';
import Message from '../components/message';
import TokenController from './token_controller';

export default class WSSController {
    static token = localStorage.getItem('jwtToken');
    //TODO:: MAKE LOCALHOST PORT A VAR
    static web_socket: WebSocket = new WebSocket(`ws://localhost:3000?token=${this.token}`);
    static active_users: UUID[] = []

    public static open_coneection(): void {
        WSSController.web_socket.addEventListener('open', function (event) {
            console.log('WebSocket connection established');
        });
        
        WSSController.web_socket.addEventListener('message', function (event) {
            console.log('Event from WSSController:', event.data);
        });
    }

    public static send_message(message: Message) {
        const message_to_send = JSON.stringify(message)
        WSSController.web_socket.send(message_to_send);
    }

    // public static async add_new_connection_to_active_users() {
    //     const client_token: string | null = await TokenController.retrieve_token_from_storage()

    //     if(client_token !== null) {
    //         const user_id_from_token: UUID | null = await TokenController.userID_from_token(client_token)
    //         if(user_id_from_token !== null) {
    //             this.active_users.push(user_id_from_token)
    //         }
    //     }
    //     console.log(this.active_users)
    // }
}