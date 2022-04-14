'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../../../config/db';
import { v4 as uuid } from 'uuid';
import { IGroup, GroupInput } from '../../../interfaces';

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
            allowNull: true
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

Group.belongsTo(Group, {
    foreignKey: 'parentId',
    targetKey: 'id',
    as: 'group',
});

Group.addScope('group', {
    include: {
        model: Group,
        as: 'group',
        attributes: ['name'],
    }
});

export default Group;