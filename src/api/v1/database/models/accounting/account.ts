'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IAccount, AccountInput } from '../../../interfaces';
import Group from './group';
import User from '../user';

class Account
    extends Model<IAccount, AccountInput>
    implements IAccount {
    declare id: string;
    public name!: string;
    public code!: string;
    public groupId!: string;
    public isGroup!: boolean;
    public posReport!: string;
    public posBalance!: string;
    public isCash!: boolean;
    public parentId!: string;
    public userId!: string;
    public isActive!: boolean;
    public credit!: number;
    public debit!: number;
    public balance!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Account.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name is required'
                }
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Code is required'
                }
            }
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Groups', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        isGroup: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        posReport: {
            type: DataTypes.ENUM,
            values: ['Neraca', 'Laba Rugi'],
            validate: {
                isIn: {
                    args: [['Neraca', 'Laba Rugi']],
                    msg: 'Must be Neraca or Laba Rugi'
                }
            }
        },
        posBalance: {
            type: DataTypes.ENUM,
            values: ['Debet', 'Kredit'],
            validate: {
                isIn: {
                    args: [['Debit', 'Kredit']],
                    msg: 'Must be Debit or Kredit'
                }
            }
        },
        isCash: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        parentId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

Account.beforeCreate((Account) => {
    Account.id = uuid();
});

Account.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Account.belongsTo(Account, {
    foreignKey: 'parentId',
    targetKey: 'id',
    as: 'parent'
});

Account.addScope('group', {
    include: {
        model: Group,
        as: 'group',
        attributes: ['name']
    }
});

Account.addScope('parent', {
    include: {
        model: Account,
        as: 'parent',
        attributes: ['name']
    }
});

export default Account;