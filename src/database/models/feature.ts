'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IFeature, FeatureInput } from 'src/interfaces';

class Feature
  extends Model<IFeature, FeatureInput>
  implements IFeature {
  public id!: string;
  public name!: string;
  public description!: string;
  public icon!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Feature.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Feature.beforeCreate((Feature) => {
  Feature.id = uuid();
});

export default Feature;