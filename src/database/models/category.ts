'use strict'
import { DataTypes, Model } from 'sequelize'
import db from '../../../config/db'
import { v4 as uuid } from 'uuid'
import { ICategory, CategoryInput } from 'src/interfaces';

class Category
  extends Model<ICategory, CategoryInput>
  implements ICategory {
  public id!: string
  public name!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Category.init(
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

Category.beforeCreate((category) => {
  category.id = uuid()
})

export default Category