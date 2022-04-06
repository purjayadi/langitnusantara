'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPackageService, PackageServiceInput } from '../../interfaces';

class PackageService
  extends Model<IPackageService, PackageServiceInput>
  implements IPackageService {
  public id!: string;
  public packageId!: string;
  public serviceId!: string;
  public type!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

PackageService.init(
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
    serviceId: {
      type: DataTypes.UUID,
      references: {
        model: 'Services', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    type: {
      type: DataTypes.ENUM,
      values: ['inc', 'exc']
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

PackageService.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

PackageService.beforeCreate((type) => {
  type.id = uuid();
});


export default PackageService;