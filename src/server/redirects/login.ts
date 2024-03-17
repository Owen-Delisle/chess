export default function redirect_to_login_page(): void {
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