import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class GameAcceptedMessage extends Message {
    recipient_id: UUID
    constructor(recipient_id: UUID) {
        super(MessageType.game_accepted)

        this.recipient_id = recipient_id
    }
}