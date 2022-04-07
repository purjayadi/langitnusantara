import { Optional } from 'sequelize';

export interface IDestination{
    id?: string;
    name: string;
    slug?: string;
    banner?: string;
    isFeatured: boolean;
}

export interface DestinationInput extends Optional<IDestination, 'id'> {}
export interface DestinationOutput extends Required<IDestination> {}