'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IDestination, DestinationInput } from '../../interfaces';
import Package from './package';
import Review from './review';
import PackagePrice from './packagePrice';
import Category from './category';
var slug = require('slug');
class Destination
    extends Model<IDestination, DestinationInput>
    implements IDestination {
    public id!: string;
    public name!: string;
    public slug!: string;
    public banner!: string;
    public isFeatured!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    dataValues: any;
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
        slug: {
            type: DataTypes.STRING,
            unique: true
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

// Package.belongsTo(Destination, {
//     foreignKey: 'destinationId',
//     as: 'destination',
// });


Destination.beforeCreate((destination) => {
    destination.id = uuid();
    destination.slug = slug(destination.dataValues?.name);
});

Destination.hasMany(Package, {
    foreignKey: 'destinationId',
    as: 'packages',
});

Destination.addScope('packages', {
    include: [
        {
            model: Package,
            as: 'packages',
            attributes: ['name'],
            include: [
                {
                    model: Review,
                    as: 'reviews',
                }
            ]
        },
    ]
});

Destination.addScope('packagesAllAttributes', {
    include: [
        {
            model: Package,
            as: 'packages',
            attributes: ['name'],
            include: [

                {
                    model: PackagePrice,
                    as: 'price',
                    attributes: ['description', 'price'],
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        },
    ]
});


export default Destination;