import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class LoginMessage extends Message {
    recipient_id: UUID

    constructor(recipient_id: UUID) {
        super(MessageType.login)
        this.recipient_id = recipient_id
    }
}