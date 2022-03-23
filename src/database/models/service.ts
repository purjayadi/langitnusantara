'use strict'
import { DataTypes, Model } from 'sequelize'
import db from '../../../config/db'
import { v4 as uuid } from 'uuid'
import { IService, ServiceInput } from 'src/interfaces';

class Service
  extends Model<IService, ServiceInput>
  implements IService {
  public id!: string
  public name!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
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
)

Service.beforeCreate((type) => {
  type.id = uuid()
})

export default Service