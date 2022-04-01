import { Optional } from 'sequelize';

export interface ITeam{
    id?: string;
    name: string;
    photo?: string;
    position: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
}

export interface TeamInput extends Optional<ITeam, 'id'> {}
export interface TeamOutput extends Required<ITeam> {}