export default abstract class Message {
    message_type: MessageType

    constructor(message_type: MessageType) {
        this.message_type = message_type
    }
}

export enum MessageType {
    login,
    move,
    logout,
    active_users,
    game_request,
    game_accepted,
    game_declined,
    game_canceled,
    castle_move,
    king_check_status,
    checkmate
}