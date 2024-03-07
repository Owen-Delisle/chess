import TokenController from './token_controller'

export default class LoginController {
    static token = localStorage.getItem('jwtToken')

    // REFACTOR
    public static add_login_submit_listener() {
        if(LoginController.token) {
            // window.location.href = '/dashboard'
            return
        }
        document.addEventListener('DOMContentLoaded', function () {
            const loginForm = document.getElementById('login_form') as HTMLFormElement

            if (!loginForm) {
                throw new Error("Login in form not found in Login Controller")
            }

            loginForm.addEventListener('submit', async function (event) {
                event.preventDefault()

                const username = (document.getElementById('username') as HTMLInputElement).value
                const password = (document.getElementById('password') as HTMLInputElement).value
                
                const form_data = {
                    username,
                    password
                }

                try {
                    const response = await fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(form_data)
                    })

                    if (!response.ok) {
                        throw new Error('Failed to login')
                    }

                    const { token } = await response.json()

                    // Store token in local storage
                    TokenController.add_token_to_storage(token)

                    // Redirect user to dashboard or another page
                    // window.location.href = '/dashboard'
                } catch (error: any) {
                    console.error('Error:', error.message)
                    alert('Thrown from Client - Failed to login on')
                }
            })
        })
    }
}