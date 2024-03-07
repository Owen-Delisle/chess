import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameRequestMessage extends Message {
    recipient_id: UUID
    sender: UUID
    constructor(sender: UUID, recipient_id: UUID) {
        super(MessageType.game_request)

        this.sender = sender
        this.recipient_id = recipient_id
    }
}