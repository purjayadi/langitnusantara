'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPaymentChanel, PaymentChanelInput } from '../../interfaces';

class PaymentChanel
  extends Model<IPaymentChanel, PaymentChanelInput>
  implements IPaymentChanel {
  declare id: string;
  public name!: string;
  public chanelCode!: string;
  public chanelCategory!: string;
  public logo!: string;
  public isActive!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

PaymentChanel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chanelCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chanelCategory: {
        type: DataTypes.ENUM,
        values: ['VIRTUAL_ACCOUNT', 'RETAIL_OUTLET', 'EWALLET', 'CREDIT_CARD','QRIS'],
    },
    logo: { 
      type: DataTypes.STRING, 
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('logo');
        // remove string from string
        const url:string = process.env.URL || 'http://localhost';
        const value = rawValue?.replace('public', url);
        return value;
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

PaymentChanel.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

PaymentChanel.beforeCreate((type) => {
  type.id = uuid();
});


export default PaymentChanel;