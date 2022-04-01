'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { ISession, SessionInput } from 'src/interfaces';

class Session
  extends Model<ISession, SessionInput>
  implements ISession {
  public id!: string;
  public userId!: string;
  public expires!: Date;
  public data!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: db
  }
);


Session.beforeCreate((type) => {
  type.id = uuid();
});

export default Session;