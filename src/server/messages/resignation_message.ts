import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class ResignationMessage extends Message {
    recipient_id: UUID

    constructor(recipient_id: UUID) {
        super(MessageType.resignation)

        this.recipient_id = recipient_id
    }
}