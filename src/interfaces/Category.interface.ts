import { Optional } from 'sequelize'

export interface ICategory{
    id: string;
    name: string;
}

export interface CategoryInput extends Optional<ICategory, 'id'> {}
export interface CategoryOutput extends Required<ICategory> {}