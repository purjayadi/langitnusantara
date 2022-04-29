'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IGroup, GroupInput } from '../../../interfaces';
import Account from './account';
import Journal from './Journal';

class Group
    extends Model<IGroup, GroupInput>
    implements IGroup {
    declare id: string;
    public name!: string;
    public code!: string;
    parentId!: string;
    public isActive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    children: any;
    subGroup: any;
}

Group.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

Group.beforeCreate((Group) => {
    Group.id = uuid();
});

Group.hasMany(Group, {
    foreignKey: 'parentId',
    as: 'subGroup',
});

Group.hasMany(Account, {
    foreignKey: 'groupId',
    as: 'account'
});

Account.belongsTo(Group, {
    foreignKey: 'groupId',
    targetKey: 'id',
    as: 'group'
});


Group.addScope('children', {
    include: {
        model: Group,
        as: 'subGroup',
        attributes: ['id', 'code', 'name'],
        include: [
            {
                model: Group,
                as: 'subGroup',
                attributes: ['id', 'code', 'name'],
                include: [
                    {
                        model: Account,
                        as: 'account',
                        required: false,
                        attributes: ['id', 'code', 'name'],
                    }
                ]
            }
        ]
    }
});

Group.addScope('subGroup', {
    include: {
        model: Group,
        as: 'subGroup',
        attributes: ['name'],
        include: [
            {
                model: Account,
                as: 'account',
                attributes: ['id', 'name',
                    [Sequelize.fn('SUM', Sequelize.col('debit')), 'debit'],
                    [Sequelize.fn('SUM', Sequelize.col('credit')), 'credit'],
                    [Sequelize.literal('SUM(debit) - SUM(credit)'), 'balance'],
                ],
                include: [
                    {
                        attributes: [],
                        model: Journal,
                        as: 'journal',
                        required: true
                    }
                ]
            }
        ]
    },
});

export default Group;