'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IPage, PageInput } from '../../interfaces';
var slug = require('slug');

class Page
  extends Model<IPage, PageInput>
  implements IPage {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  dataValues: any;
}

Page.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Page.beforeCreate((type) => {
  type.id = uuid();
  type.slug = slug(type.dataValues?.name);
});

export default Page;