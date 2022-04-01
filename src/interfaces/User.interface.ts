import { Optional } from 'sequelize';

export interface IUser{
    id?: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
}

export interface UserInput extends Optional<IUser, 'id'> {}
export interface UserOutput extends Required<IUser> {}