export interface User {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: UserObject;
}

interface UserObject {
    id: number;
    name: string;
    email: string;
    email_verified_at?: Date;
    created_at: Date;
    updated_at: Date;
}
