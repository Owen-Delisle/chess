import Message, { MessageType } from "./message";
import { UUID } from "crypto";

export default class DrawMessage extends Message {
    recipient_id: UUID
    message: string 
    constructor(recipient_id: UUID, message: string) {
        super(MessageType.draw)

        this.recipient_id = recipient_id
        this.message = message
    }
}