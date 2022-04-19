'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db';
import { v4 as uuid } from 'uuid';
import { ITeam, TeamInput } from '../../interfaces';

class Team
    extends Model<ITeam, TeamInput>
    implements ITeam {
    declare id: string;
    public name!: string;
    public position!: string;
    public photo!: string;
    public facebook!: string;
    public twitter!: string;
    public instagram!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Team.init(
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('photo');
            // remove string from string
            const url:string = process.env.URL || 'http://localhost';
            const value = rawValue?.replace('public', url);
            return value;
        }
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    timestamps: true,
    sequelize: db
}
);

Team.beforeCreate((Team) => {
    Team.id = uuid();
});

export default Team;