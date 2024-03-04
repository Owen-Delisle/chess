import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class ActiveUsersMessage extends Message {
    static json_key: string = "active_users"

    active_users: UUID[]
    constructor(active_users: UUID[]) {
        super(MessageType.login)
        this.active_users = active_users
    }

    public json_string(): string {
        return JSON.stringify({ type: ActiveUsersMessage.json_key, users: this.active_users })
    }
}