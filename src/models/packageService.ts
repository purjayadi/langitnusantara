'use strict'
import { DataTypes, Model } from 'sequelize'
import db from '../../config/db'
import { v4 as uuid } from 'uuid'
import { IPackageService, PackageServiceInput } from 'src/interfaces';

class PackageService
  extends Model<IPackageService, PackageServiceInput>
  implements IPackageService {
  public id!: string
  public packageId!: string
  public serviceId!: string
  public type!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

PackageService.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    packageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['inc', 'exc']
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
)

PackageService.beforeCreate((type) => {
  type.id = uuid()
})

export default PackageService