export default class TokenController {
    static jwt_token_id: string = 'jwtToken'

    static async retrieve_token_from_storage(): Promise<string | null> {
        const token: string | null = localStorage.getItem(this.jwt_token_id)
        return token
    }

    static async add_token_to_storage(token: string): Promise<void> {
        // TODO:: VERIFY TOKEN BEFORE ADDING
        localStorage.setItem(this.jwt_token_id, token)
    }

    //TODO:: FIND OUT WHY THIS CHECK BREAKS STUFF
    static async verify_jwt_token(token: string): Promise<boolean> {
        console.log('TEEHEE YOOHOO')
        try {
            const response = await fetch('/verify_jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: token
                }
            );
            const data: boolean = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }
}