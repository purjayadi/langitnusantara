import { Optional } from 'sequelize';

export interface IPartner{
    id?: string;
    name: string;
    image?: string;
}

export interface PartnerInput extends Optional<IPartner, 'id'> {}
export interface PartnerOutput extends Required<IPartner> {}
