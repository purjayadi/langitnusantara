import { Optional } from 'sequelize';

export interface ICategory{
    id: string;
    name: string;
    icon: string;
    color: string;
}

export interface CategoryInput extends Optional<ICategory, 'id'> {}
export interface CategoryOutput extends Required<ICategory> {}