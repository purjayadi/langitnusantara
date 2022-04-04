'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IDestination, DestinationInput } from 'src/interfaces';

class Destination
    extends Model<IDestination, DestinationInput>
    implements IDestination {
    public id!: string;
    public name!: string;
    public banner!: string;
    public isFeatured!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Destination.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

Destination.beforeCreate((destination) => {
    destination.id = uuid();
});

export default Destination;