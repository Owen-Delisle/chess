export default abstract class Message {
    message_type: MessageType

    constructor(message_type: MessageType) {
        this.message_type = message_type
    }
}

export enum MessageType {
    move,
    logout,
    active_users,
    connection_lost,
    game_request,
    game_accepted,
    game_declined,
    game_canceled,
    castle_move,
    king_check_status,
    checkmate,
    draw,
    en_passant,
    resignation,
    offer_draw,
    draw_offer_declined
}