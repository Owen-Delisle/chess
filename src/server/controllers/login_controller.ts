import ClientWebSocket from '../client_websocket'
import TokenController from './token_controller'

export default class LoginController {
    // REFACTOR
    public static add_login_submit_listener() {
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

                    const token_from_db = await TokenController.retrieve_token_from_db_by_username(username)
                    if (!token_from_db) {
                        throw new Error('Bad token from DB')
                    }

                    TokenController.add_token_to_storage(token_from_db)
                    LoginController.redirect_to_online_page()

                } catch (error: any) {
                    console.error('Error:', error.message)
                    alert('Thrown from Client - Failed to login on')
                }
            })
        })
    }

    private static redirect_to_online_page(): void {
        fetch('/redirect_to_online').then(response => {
            if (response.ok) {
                window.location.href = '/'
            } else {
                console.error('Error triggering redirect:', response.statusText)
            }
        }).catch(error => {
            console.error('Redirect Fetch Error:', error)
        })
    }

    public static redirect_to_login_page(): void {
        fetch('/redirect_to_login').then(response => {
            if (response.ok) {
                window.location.href = '/login'
            } else {
                console.error('Error triggering redirect:', response.statusText)
            }
        }).catch(error => {
            console.error('Redirect Fetch Error:', error)
        })
    }
}