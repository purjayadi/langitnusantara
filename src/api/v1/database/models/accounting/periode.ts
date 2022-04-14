'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPeriode, PeriodeInput } from '../../../interfaces';

//make class periode
class Periode extends Model<IPeriode, PeriodeInput> implements IPeriode {
    declare id: string;
    public code!: string;
    public startDate!: Date;
    public endDate!: Date;
    public isActive!: boolean;
    public userId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

//initial periode
Periode.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

Periode.beforeCreate((Periode) => {
    Periode.id = uuid();
});

export default Periode;