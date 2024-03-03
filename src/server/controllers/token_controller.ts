export default class TokenController {
    static jwt_token_id: string = 'jwtToken'

    static async retrieve_token_from_storage(): Promise<string | null> {
        const token: string | null = localStorage.getItem(this.jwt_token_id)
        return token
    }

    static async add_token_to_storage(token: string): Promise<void> {
    try {
        const is_valid_token: boolean = await TokenController.verify_jwt_token(token);
        console.log("BAAALALLALBALABLBALA");
        console.log(is_valid_token);
        if (is_valid_token) {
            localStorage.setItem(this.jwt_token_id, token);
        }
    } catch (error) {
        // Handle verification error
        console.error('Verification error:', error.message);
        // Optionally rethrow the error to propagate it to the caller
        throw error;
    }
}

    //TODO
    // static async userID_from_token(token: string): Promise<void> {
    //     console.log('BLAAAABLABLABLABLA')
    //     try {
    //         const response = await fetch('/verify_jwt', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ key: token }),
    //             }
    //         )
    //         const data = await response.json()
    //         console.log(data)
    //     } catch (error) {
    //         console.error('Error:', error)
    //     }
    // }

    //TODO:: FIND OUT WHY THIS CHECK BREAKS STUFF
    static async verify_jwt_token(token: string): Promise<boolean> {
        try {
            const response = await fetch('/verify_jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }),
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                return data.success === true;
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }
}