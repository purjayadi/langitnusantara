'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IService, ServiceInput } from '../../interfaces';
// import PackageService from './packageService';

class Service
  extends Model<IService, ServiceInput>
  implements IService {
  declare id: string;
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Service.beforeCreate((type) => {
  type.id = uuid();
});

// Service.belongsTo(PackageService, { foreignKey: 'id', targetKey: 'serviceId', as: 'details' });

export default Service;