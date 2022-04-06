'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPackagePrice, PackagePriceInput } from '../../interfaces';

class PackagePrice
  extends Model<IPackagePrice, PackagePriceInput>
  implements IPackagePrice {
  public id!: string;
  public packageId!: string;
  public description!: string;
  public price!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

PackagePrice.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    packageId: {
      type: DataTypes.UUID,
      references: {
        model: 'Packages', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

PackagePrice.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

PackagePrice.beforeCreate((type) => {
  type.id = uuid();
});


export default PackagePrice;