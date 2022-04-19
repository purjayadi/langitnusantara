'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { IReview, ReviewInput } from '../../interfaces';

class Review
  extends Model<IReview, ReviewInput>
  implements IReview {
  declare id: string;
  public packageId!: string;
  public name!: string;
  public email!: string;
  public rating!: number;
  public message!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Review.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

Review.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

Review.beforeCreate((type) => {
  type.id = uuid();
});


export default Review;