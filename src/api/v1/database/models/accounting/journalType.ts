'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IJournalType, JournalTypeInput } from '../../../interfaces';

// class journal types
class JournalType extends Model<IJournalType, JournalTypeInput> implements IJournalType {
    declare id: string;
    public name!: string;
    public code!: string;
    public note!: string;
    public isActive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

// initial journal types
JournalType.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
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

JournalType.beforeCreate((JournalType) => {
    JournalType.id = uuid();
});

export default JournalType;