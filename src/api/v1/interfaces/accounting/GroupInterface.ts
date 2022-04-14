import { Optional } from 'sequelize';

export interface IGroup{
    id: string;
    name: string;
    code: string;
    parentId: string;
    isActive: boolean;
}

export interface GroupInput extends Optional<IGroup, 'id'> {}
export interface GroupOutput extends Required<IGroup> {}