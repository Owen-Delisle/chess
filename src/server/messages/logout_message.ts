import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class LogoutMessage extends Message {
    recipient_id: UUID
    constructor(recipient_id: UUID) {
        super(MessageType.logout)
        this.recipient_id = recipient_id
    }
}