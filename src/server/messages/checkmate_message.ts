import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class CheckmateMessage extends Message {
    sender_id: UUID
    recipient_id: UUID
    winning_king_id: string
    losing_king_id: string

    constructor(sender_id: UUID, recipient_id: UUID, losing_king_id: string, winning_king_id: string) {
        super(MessageType.checkmate)

        this.sender_id = sender_id
        this.recipient_id = recipient_id
        this.winning_king_id = winning_king_id
        this.losing_king_id = losing_king_id
    }
}