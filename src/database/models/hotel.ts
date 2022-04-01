'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IHotel, HotelInput } from 'src/interfaces';

//dto
class Hotel
  extends Model<IHotel, HotelInput>
  implements IHotel {
  public id!: string;
  public name!: string;
  public address!: string;
  public description!: string;
  public banner!: string;
  public price!: number;
  public isActive!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Hotel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    banner: {
      type: DataTypes.STRING,
      defaultValue: 'banner.jpg'
    },
    price: {
      type: DataTypes.DECIMAL
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Hotel.beforeCreate((type) => {
  type.id = uuid();
});

export default Hotel;