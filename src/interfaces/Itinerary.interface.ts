import { Optional } from 'sequelize';

export interface IItinerary{
    id?: string;
    packageId: string;
    title: string;
    day: number;
    meta: string;
    description: string;
}

export interface IItineraryInput extends Optional<IItinerary, 'id'> {}
export interface IItineraryOutput extends Required<IItinerary> {}
