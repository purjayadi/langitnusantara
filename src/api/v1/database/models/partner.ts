'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { IPartner, PartnerInput } from '../../interfaces';

//dto
class Partner
  extends Model<IPartner, PartnerInput>
  implements IPartner {
  declare id: string;
  public name!: string;
  public image!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Partner.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'banner.jpg',
      get() {
        const rawValue = this.getDataValue('image');
        // remove string from string
        const url:string = process.env.URL || 'http://localhost';
        const value = rawValue?.replace('public', url);
        return value;
      }
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Partner.beforeCreate((type) => {
  type.id = uuid();
});

export default Partner;