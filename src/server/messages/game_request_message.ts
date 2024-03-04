import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameRequestMessage extends Message {
    recipient_id: UUID
    constructor(recipient_id: UUID) {
        super(MessageType.game_request)

        this.recipient_id = recipient_id
    }
}