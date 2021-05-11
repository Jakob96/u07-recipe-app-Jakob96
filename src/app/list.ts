export interface List {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    description?: string;
    user_id: number;
}