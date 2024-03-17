import { UUID } from "crypto"

export default class TokenAPI {
    static jwt_token_id: string = 'jwtToken'

    static async retrieve_token_from_storage(): Promise<string | null> {
        const token: string | null = localStorage.getItem(this.jwt_token_id)
        return token
    }

    static async add_token_to_storage(token: string): Promise<void> {
        try {
            const is_valid_token: boolean = await this.verify_jwt_token(token)
            if (is_valid_token) {
                localStorage.setItem(this.jwt_token_id, token)
            }
        } catch (error: any) {
            // Handle verification error
            console.error('Verification error:', error.message)
            // Optionally rethrow the error to propagate it to the caller
            throw error
        }
    }

    static async retrieve_token_from_db_by_username(username: string): Promise<string | null> {
        console.log("RETREIVING TOKEN")
        try {
            const response = await fetch('/active_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username }),
            })
            if(response.ok) {
                const data = await response.json()
                return data.active_token.token
            } else {
                throw new Error('Bad response from /active_token')
            }
        } catch(error) {
            console.error('Error:', error)
            return null
        }
    }

    static async userID_from_token(token: string): Promise<UUID | null> {
        const token_data = { token: token }
        console.log(token_data)
        try {
            const response = await fetch('/userID_from_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(token_data),
            })
            if (response.ok) {
                const data = await response.json()
                return data.userId
            } else {
                throw new Error('Failed to fetch')
            }
        } catch (error) {
            console.error('Error:', error)
            return null
        }
    }

    static async verify_jwt_token(token: string): Promise<boolean> {
        try {
            const response = await fetch('/verify_jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }),
            })
            if (response.ok) {
                const data = await response.json()
                return data.success === true
            } else {
                throw new Error('Failed to fetch')
            }
        } catch (error) {
            console.error('Error:', error)
            return false
        }
    }
}