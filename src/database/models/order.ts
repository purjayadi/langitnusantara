'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IOrder, OrderInput } from 'src/interfaces';
import Package from './package';
import Category from './category';
import User from './user';

class Order
  extends Model<IOrder, OrderInput>
  implements IOrder {
  public id!: string;
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
      allowNull: false
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
      allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Unpaid', 'Paid', 'Done', 'Canceled']
    }
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
Order.belongsTo(User, {  foreignKey: 'userId', as: 'user' });

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