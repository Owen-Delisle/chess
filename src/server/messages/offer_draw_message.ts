import Message, { MessageType } from "./message";
import { UUID } from "crypto"

export default class OfferDrawMessage extends Message {
    sender_id: UUID
    receiver_id: UUID

    constructor(sender_id: UUID, receiver_id: UUID) {
        super(MessageType.offer_draw)

        this.sender_id = sender_id
        this.receiver_id = receiver_id
    }
}