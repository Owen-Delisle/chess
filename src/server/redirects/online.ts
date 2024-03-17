export default function redirect_to_online_page(): void {
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