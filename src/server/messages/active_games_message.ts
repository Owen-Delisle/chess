import { UUID } from "crypto";
import Message, { MessageType } from "./message";

export default class ActiveGamesMessage extends Message {
    active_games: {id: UUID, user1: UUID, user2: UUID}[]
    constructor(active_games: {id: UUID, user1: UUID, user2: UUID}[]) {
        super(MessageType.active_games)
        this.active_games = active_games
    }
}