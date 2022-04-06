import { Optional } from 'sequelize';

export interface IHotel{
    id?: string;
    name: string;
    address: string;
    description: string;
    banner?: string;
    price: number;
    isActive: boolean;
}

export interface HotelInput extends Optional<IHotel, 'id'> {}
export interface HotelOutput extends Required<IHotel> {}
