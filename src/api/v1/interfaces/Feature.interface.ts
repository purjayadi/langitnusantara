import { Optional } from 'sequelize';

export interface IFeature{
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface FeatureInput extends Optional<IFeature, 'id'> {}
export interface FeatureOutput extends Required<IFeature> {}