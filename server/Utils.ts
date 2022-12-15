export interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    username: string,
    password: string,
    excersisesList: Excersise[],
    isAdmin: boolean,
    comments: Comment[]

}

export interface Comment {
    title: string,
    createdBy: string,
}

export interface Excersise {
    excersise: string,
    description: string
}