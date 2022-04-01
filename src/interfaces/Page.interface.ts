import { Optional } from 'sequelize';

export interface IPage{
    id: string;
    name: string;
    slug?: string;
    description: string;
}

export interface PageInput extends Optional<IPage, 'id'> {}
export interface PageOutput extends Required<IPage> {}