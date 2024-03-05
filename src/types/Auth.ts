export type UserAccountType = "buyer" | "seller";

export type User = {
    id: number;
    name: string;
    cpf: string;
    phone_number?: string;
    email: string;
    sector: string;
    role: string;
    accountType: UserAccountType;
    createdAt: Date;
} 