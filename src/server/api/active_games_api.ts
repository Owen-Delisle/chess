import { UUID } from "crypto"

export default class ActiveGamesAPI {
    public static async active_games(): Promise<{ id: UUID, user1: UUID, user2: UUID }[] | undefined> {
        try {
            const response = await fetch('/active_games', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error('Bad res from active_games fetch')
            }

            const res = await response.json()
            return res.active_games

        } catch (error: any) {
            console.error('Error:', error.message)
            alert('Thrown from Client - Failed to fetch active games')
        }
    }

    public static async post_active_game(user1: UUID, user2: UUID): Promise<{ status: number }> {
        try {
            const response = await fetch('/post_active_game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1, user2 })
            })

            if (!response.ok) {
                throw new Error('Bad res from post_active_game fetch')
            }
            return { status: 200 }
        } catch (error: any) {
            console.error('Error:', error.message)
            alert('Thrown from Client - Failed to post active game')
            return { status: 500 }
        }
    }

    public static async delete_active_game(user1: UUID, user2: UUID) {
        try {
            const response = await fetch('/delete_active_game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1, user2 })
            })

            if (!response.ok) {
                throw new Error('Bad res from delete_active_game fetch')
            }
        } catch (error: any) {
            console.error('Error:', error.message)
            alert('Thrown from Client - Failed to delete active game')
        }
    }
}