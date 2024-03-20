import redirect_to_login_page from "../redirects/login"

export default class SignupAPI {
    public static async signup(username: string, email: string, password: string) {
        console.log(username, email, password)

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            })

            if (!response.ok) {
                const json = await response.json()
                alert(json.message)
                throw new Error('Failed to signup')
            }

            redirect_to_login_page()

        } catch (error) {
            console.error('Error:', error)
        }
    }
}