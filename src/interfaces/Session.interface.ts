import { Optional } from 'sequelize';

export interface ISession{
    id: string;
    userId: string;
    expires: Date;
    data: string;
}

export interface SessionInput extends Optional<ISession, 'id'> {}
export interface SessionOutput extends Required<ISession> {}