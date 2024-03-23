import TokenAPI from "./token_api"
import redirect_to_home_page from "../redirects/home"

export default class LoginAPI {
    public static async login_with_form(username: string, password: string): Promise<void> {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })

            if (!response.ok) {
                throw new Error('Failed to login')
            }

            const token_from_db = await TokenAPI.retrieve_token_from_db_by_username(username)
            if (!token_from_db) {
                throw new Error('Bad token from DB')
            }

            TokenAPI.add_token_to_storage(token_from_db)
            redirect_to_home_page()

        } catch (error: any) {
            alert('Failed to login. That username and password do not exist.')
        }
    }
}