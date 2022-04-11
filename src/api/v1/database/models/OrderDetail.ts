'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IOrderDetail, OrderDetailInput } from '../../interfaces';

class OrderDetail
    extends Model<IOrderDetail, OrderDetailInput>
    implements IOrderDetail {
    public id!: string;
    public orderId!: string;
    public externalId!: string;
    public chanelCode!: string;
    public chanelCategory!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

OrderDetail.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        externalId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        orderId: {
            type: DataTypes.STRING,
            references: {
                model: 'Orders', // name of Target model
                key: 'noInvoice' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        chanelCode: {
            type: DataTypes.STRING,
        },
        chanelCategory: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        sequelize: db
    }
);

OrderDetail.beforeBulkCreate((types) => {
    for (const type of types) {
        type.id = uuid();
    }
});

OrderDetail.beforeCreate((type) => {
    type.id = uuid();
});


export default OrderDetail;