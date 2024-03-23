export default function redirect_to_home_page(): void {
    fetch('/redirect_to_home').then(response => {
        if (response.ok) {
            window.location.href = '/'
        } else {
            console.error('Error triggering redirect:', response.statusText)
        }
    }).catch(error => {
        console.error('Redirect Fetch Error:', error)
    })
}