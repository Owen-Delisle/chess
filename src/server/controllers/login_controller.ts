
export default class LoginController {
    static token = localStorage.getItem('jwtToken')

    public static add_login_submit_listener() {
        console.log('Oh index, you shouldnt have!')
        if(LoginController.token) {
            window.location.href = '/dashboard'
            return
        }
        document.addEventListener('DOMContentLoaded', function () {
            const loginForm = document.getElementById('login_form') as HTMLFormElement
            console.log('OH THE HUMANITY')

            if (!loginForm) {
                throw new Error("Login in form not found in Login Controller")
            }

            loginForm.addEventListener('submit', async function (event) {
                console.log('Hi, Mom!')
                event.preventDefault()

                const username = (document.getElementById('username') as HTMLInputElement).value
                const password = (document.getElementById('password') as HTMLInputElement).value

                const formData = {
                    username,
                    password
                }

                console.log(formData)

                try {
                    const response = await fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })

                    if (!response.ok) {
                        throw new Error('Failed to login')
                    }

                    const { token } = await response.json()

                    const poo = {
                        type: 'login',
                        userID: 'b6cd9167-479f-40f5-a24d-dc594c27963b',
                    }

                    // Store token in local storage
                    localStorage.setItem('jwtToken', token)

                    // Redirect user to dashboard or another page
                    window.location.href = '/dashboard'
                } catch (error) {
                    console.error('Error:', error.message)
                    alert('Thrown from Client - Failed to login on')
                }
            })
        })
    }
}