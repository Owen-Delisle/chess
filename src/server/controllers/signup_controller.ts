import { get_element_by_id } from '../../ui/utils/funcs'
import SignupAPI from '../api/signup_api'

export default class SignupController {
    public static add_signup_submit_listener() {
        document.addEventListener('DOMContentLoaded', function () {
            const signup_form = document.getElementById('signup_form') as HTMLFormElement

            if (!signup_form) {
                throw new Error("Signup in form not found in Signup Controller")
            }

            signup_form.addEventListener('submit', async function (event) {
                event.preventDefault()

                const username = (get_element_by_id('username') as HTMLInputElement).value
                const email = (get_element_by_id('email') as HTMLInputElement).value
                const password = (get_element_by_id('password') as HTMLInputElement).value

                console.log("submit clicked")
                SignupAPI.signup(username, email, password)
            })
        })
    }
}