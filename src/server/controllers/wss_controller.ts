import MoveMessage from '../components/move_message'

export default class WSSController {
    static web_socket: WebSocket = new WebSocket('ws://localhost:3000');

    public static open_coneection(): void {
        WSSController.web_socket.addEventListener('open', function (event) {
            console.log('WebSocket connection established');
        });
        
        WSSController.web_socket.addEventListener('message', function (event) {
            console.log('Event from WSSController:', event.data);
        });
    }

    public static send_move_message(move_message: MoveMessage) {
        const message_to_send = JSON.stringify(move_message)
        WSSController.web_socket.send(message_to_send);
    }
}