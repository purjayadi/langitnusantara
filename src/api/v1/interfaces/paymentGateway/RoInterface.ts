import { Optional } from 'sequelize';

export interface IRo{
    id: string;
    externalID: string,
    retailOutletName: string,
    name: string,
    expectedAmt: number,
}

export interface RoInput extends Optional<IRo, 'id'> {}
export interface RoOutput extends Required<IRo> {}