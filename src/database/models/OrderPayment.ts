'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IOrderPayment, OrderPaymentInput } from 'src/interfaces';

class OrderPayment
  extends Model<IOrderPayment, OrderPaymentInput>
  implements IOrderPayment {
  public id!: string;
  public source?: string | undefined;
  public externalId?: string;
  public orderId!: string;
  public chanelCode!: string;
  public amount!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

OrderPayment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orderId: {
      type: DataTypes.UUID,
        references: {
          model: 'Orders', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    chanelCode: {
      type: DataTypes.UUID,
        references: {
          model: 'PaymentChanels', // name of Target model
          key: 'chanelCode' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

OrderPayment.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

OrderPayment.beforeCreate((type) => {
  type.id = uuid();
});


export default OrderPayment;