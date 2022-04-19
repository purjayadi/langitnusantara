'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { ITag, TagInput } from '../../../interfaces';

// class tags
class Tag extends Model<ITag, TagInput> implements ITag {
    declare id: string;
    public name!: string;
    public code!: string;
    public bgColor!: string;
    public txtColor!: string;
    public isActive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

// initial tags
Tag.init(
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
        },
        bgColor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        txtColor: {
            type: DataTypes.STRING,
            allowNull: false,
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

Tag.beforeCreate((Tag) => {
    Tag.id = uuid();
});

export default Tag;