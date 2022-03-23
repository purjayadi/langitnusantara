import { Optional } from 'sequelize'

export interface IProfile{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    logo: string;
    favicon: string;
    description: string;
}

export interface ProfileInput extends Optional<IProfile, 'id'> {}
export interface ProfileOutput extends Required<IProfile[]> {}