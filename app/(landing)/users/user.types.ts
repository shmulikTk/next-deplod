export interface User {
    id: string,
    accountName: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    language: string,
    role: string,
    status: string,
    avatar: string,
}

export interface IUsers {
   [key: string]: User
}
