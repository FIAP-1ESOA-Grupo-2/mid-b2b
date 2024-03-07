export type UserAccountType = "buyer" | "seller";

export type User = {
    id: number;
    name: string;
    cpf: string;
    phone_number?: string;
    email: string;
    sector?: string | null;
    role?: string | null;
    accountType: UserAccountType;
    createdAt: Date;
}

export type SignUpState = {
    data: {
        name: string;
        cpf: string;
        phone_number?: string;
        email: string;
        password: string;
        sector: string;
        role: string;
        emailVerified: boolean;
        accountType: UserAccountType;
    },
    step: number
}