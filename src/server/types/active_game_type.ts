import { UUID } from "crypto"

type ActiveGame = {
    id: UUID, 
    user1: UUID, 
    user2: UUID
}

export default ActiveGame