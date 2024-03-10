import { UUID } from "crypto"

export default class UserAPI {
    public static async username_from_id(user_id: UUID): Promise<string | undefined> {
        try {
            const response = await fetch('/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id})
            })

            if (!response.ok) {
                throw new Error('Bad res from username fetch')
            }

            const res = await response.json()
            return res.username

        } catch (error: any) {
            console.error('Error:', error.message)
            alert('Thrown from Client - Failed to fetch username')
        }
    }
}