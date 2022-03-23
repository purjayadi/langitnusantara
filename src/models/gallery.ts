'use strict'
import { DataTypes, Model } from 'sequelize'
import db from '../../config/db'
import { v4 as uuid } from 'uuid'
import { IGallery, GalleryInput } from 'src/interfaces';

//dto
class Gallery
  extends Model<IGallery, GalleryInput>
  implements IGallery {
  public id!: string
  public name!: string
  public isSlider!: boolean

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Gallery.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSlider: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
)

Gallery.beforeCreate((type) => {
  type.id = uuid()
})

export default Gallery