'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IItinerary, IItineraryInput } from '../../interfaces';

class Itinerary
  extends Model<IItinerary, IItineraryInput>
  implements IItinerary {
  public id!: string;
  public packageId!: string;
  public title!: string;
  public day!: number;
  public meta!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Itinerary.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    packageId: {
      type: DataTypes.UUID,
      references: {
        model: 'Packages', // name of Target model
        key: 'id' // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Itinerary.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

Itinerary.beforeCreate((type) => {
  type.id = uuid();
});


export default Itinerary;