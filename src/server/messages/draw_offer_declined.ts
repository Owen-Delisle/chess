import Message, { MessageType } from "./message";
import { UUID } from 'crypto'

export default class DrawOfferDeclinedMessage extends Message {
    recipient_id: UUID
    constructor(recipient_id: UUID) {
        super(MessageType.draw_offer_declined)

        this.recipient_id = recipient_id
    }
}