export interface CreateAccountDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface SignInDto {
    email: string;
    password: string;
}
