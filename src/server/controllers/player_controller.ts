import { UUID } from "crypto";
import { BlackOrWhite } from "../../components/square/color";

export default class PlayerController {
    static player_color: BlackOrWhite
    static opponent_user_id: UUID
}