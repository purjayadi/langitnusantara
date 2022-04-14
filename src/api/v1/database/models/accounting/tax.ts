'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../../config/db';
import { v4 as uuid } from 'uuid';
import { ITax, TaxInput } from '../../../interfaces';

// class tax model implements
class Tax extends Model<ITax, TaxInput> implements ITax {
    declare id: string;
    public name!: string;
    public code!: string;
    public percentage!: string;
    public accountTaxPurchase!: string;
    public accountTaxSales!: string;
    public isActive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

// initial tax
Tax.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountTaxPurchase: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accountTaxSales: {
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

Tax.beforeCreate((Tax) => {
    Tax.id = uuid();
});

export default Tax;