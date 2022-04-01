import { Optional } from 'sequelize';

export interface IService{
    id: string;
    name: string;
}

export interface ServiceInput extends Optional<IService, 'id'> {}
export interface ServiceOutput extends Required<IService> {}