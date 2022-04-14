import { Optional } from 'sequelize';

export interface IPeriode{
    id: string;
    code: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}

export interface PeriodeInput extends Optional<IPeriode, 'id'> {}
export interface PeriodeOutput extends Required<IPeriode> {}