'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPartner, PartnerInput } from 'src/interfaces';

//dto
class Partner
  extends Model<IPartner, PartnerInput>
  implements IPartner {
  public id!: string;
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
      defaultValue: 'banner.jpg'
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