import LoginAPI from '../api/login_api'

export default class LoginController {
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

                LoginAPI.login_with_form(username, password)
            })
        })
    }
}