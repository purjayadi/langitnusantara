'use strict'
import { DataTypes, Model } from 'sequelize'
import db from '../../config/db'
import { v4 as uuid } from 'uuid'
import { IPackage, PackageInput } from 'src/interfaces';
import Category from './category';

//dto
class Package
  extends Model<IPackage, PackageInput>
  implements IPackage {
  public id!: string
  public name!: string
  public banner!: string
  public noOfDay!: number;
  public description!: string
  public categoryId!: string
  public isFeatured?: boolean;

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Package.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    categoryId: { 
      type: DataTypes.UUID,
      references: {
        model: 'Categories', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfDay: {
      type: DataTypes.INTEGER,
    },
    banner: {
      type: DataTypes.STRING,
      defaultValue: 'banner.jpg'
    },
    description: {
      type: DataTypes.STRING,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
)

Package.beforeCreate((type) => {
  type.id = uuid()
})

Package.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
})

export default Package