'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IOrder, OrderInput } from '../../interfaces';
import Package from './package';
import Category from './category';
import User from './user';
import OrderPayment from './OrderPayment';
import OrderDetail from './OrderDetail';

class Order
  extends Model<IOrder, OrderInput>
  implements IOrder {
  declare id: string;
  public packageId!: string;
  public noInvoice!: string;
  public in!: Date;
  public out!: Date;
  public adult!: number;
  public children!: number;
  public userId!: string;
  public price!: number;
  public discount!: number;
  public amount!: number;
  public status!: string;
  public externalPaymentId!: string;
  public payment!: {
    source: string;
    chanelCode: string;
    chanelCategory: string;
  };

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Order.init(
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    noInvoice: { 
        type: DataTypes.STRING,
        unique: true
    },
    packageId: {
        type: DataTypes.UUID,
        references: {
            model: 'Packages', // name of Target model
            key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    in: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    out: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    adult: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Adult must be a number'
        },
        notNull: {
          msg: 'Adult field is required'
        }
      }
    },
    children: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Unpaid', 'Down Payment', 'Paid', 'Done', 'Canceled']
    },
    externalPaymentId: {
      type: DataTypes.STRING,
      allowNull: true
  },
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Order.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

Order.beforeCreate((order) => {
  order.id = uuid();
});

Order.belongsTo(Package, {  foreignKey: 'packageId', as: 'package' });
Order.hasMany(OrderPayment, { sourceKey: 'noInvoice', foreignKey: 'orderId', as: 'payment'});
OrderPayment.belongsTo(Order, { foreignKey: 'orderId', targetKey: 'noInvoice' });
Order.belongsTo(User, {  foreignKey: 'userId', as: 'user' });
Order.belongsTo(OrderDetail, { foreignKey: 'id', targetKey: 'orderId', as: 'paymentMethod' });

Order.addScope('package', {
  include: [
    {
      model: Package,
      as: 'package',
      attributes: ['name', 'banner'],
      include: [  
        { 
          model: Category, 
          as: 'category',
          attributes: ['name']
        } 
      ]
    }
  ]
});

Order.addScope('payment', {
  include: [
    {
      model: OrderPayment,
      as: 'payment',
      attributes: ['externalId', 'chanelCode', 'amount', 'transactionTimestamp']
    }
  ]
});

Order.addScope('detail', {
  include: [
    {
      model: OrderDetail,
      as: 'paymentMethod',
      attributes: ['externalId', 'chanelCategory', 'chanelCode']
    }
  ]
});

Order.addScope('user', {
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'fullName', 'firstName', 'lastName']
    }
  ]
});



export default Order;