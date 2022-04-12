'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IProfile, ProfileInput } from '../../interfaces';

class Profile
  extends Model<IProfile, ProfileInput>
  implements IProfile {
  declare id: string;
  public name!: string;
  public phone!: string;
  public email!: string;
  public address!: string;
  public logo!: string;
  public favicon!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address: {
      type: DataTypes.TEXT
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: 'logo.png',
      get() {
        const rawValue = this.getDataValue('logo');
        // remove string from string
        const url:string = process.env.URL || 'http://localhost';
        const value = rawValue?.replace('public', url);
        return value;
      }
    },
    favicon: {
      type: DataTypes.STRING,
      defaultValue: 'favicon.png',
      get() {
        const rawValue = this.getDataValue('favicon');
        // remove string from string
        const url:string = process.env.URL || 'http://localhost';
        const value = rawValue?.replace('public', url);
        return value;
      }
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Profile.beforeCreate((type) => {
  type.id = uuid();
});

export default Profile;