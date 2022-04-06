'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IUser, UserInput } from '../../interfaces';
import bcrypt from 'bcrypt';

class User
  extends Model<IUser, UserInput>
  implements IUser {
  public id!: string;
  public provider!: string;
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public isAdmin!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  // eslint-disable-next-line no-unused-vars
  comparePassword: ((passwd: any, cb: any) => void) | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    provider: {
      type: DataTypes.ENUM,
      values: ['local', 'google', 'facebook', 'twitter', 'github'],
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required'
        }
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        userValidation(value:string){
          if(!this.provider && !value) {
            throw new Error('Password is required');
          }
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        userValidation(value:string){
          if(!this.provider && !value) {
            throw new Error('Phone number is required');
          }
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    sequelize: db
  }
);

User.beforeBulkCreate((types) => {
  for (const type of types) {
    type.id = uuid();
  }
});

User.beforeCreate((type) => {
  type.id = uuid();
});

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  }
});

User.prototype.comparePassword = function (passwd) {
  return bcrypt.compare(passwd, this.password);
};

User.addScope('withoutPassword', {
  attributes: { exclude: ['password'] }
});


export default User;