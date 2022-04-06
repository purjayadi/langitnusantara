import { Optional } from 'sequelize';

export interface IReview{
    id: string;
    packageId: string;
    name: string;
    email: string;
    rating: number;
    message: string;
}

export interface ReviewInput extends Optional<IReview, 'id'> {}
export interface ReviewOutput extends Required<IReview> {}