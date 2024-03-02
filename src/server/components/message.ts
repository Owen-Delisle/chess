export default abstract class Message {
    message_type: MessageType
    payload: JSON

    constructor(message_type: MessageType) {
        this.message_type = message_type
    }
}

export enum MessageType {
    login,
    move,
    logout
}