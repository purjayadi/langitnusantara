'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IJournal, JournalInput } from '../../../interfaces';
import Account from './account';
import Periode from './periode';
import Tag from './tag';
import JournalType from './journalType';
import User from '../user';

// make class journal objects
class Journal extends Model<IJournal, JournalInput> implements IJournal {
    declare id: string;
    public ref!: string;
    public debit!: number;
    public credit!: number;
    public balance!: number;
    public date!: Date;
    public periodeId!: string;
    public accountId!: string;
    public tagId!: string;
    public code!: string;
    public note!: string;
    public journalTypeId!: string;
    public userId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    account: any;
    tag: any;
}


// initial journal objects
Journal.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.UUID,
            references: {
                model: 'Accounts', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        periodeId: {
            type: DataTypes.UUID,
            references: {
                model: 'Periodes', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        tagId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Tags', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        debit: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        credit: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        journalTypeId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'JournalTypes', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

Journal.beforeCreate((journal) => {
    journal.id = uuid();
});

Journal.beforeBulkCreate((journals) => {
    for (const journal of journals) {
        journal.id = uuid();
    }
});


Account.hasMany(Journal, { foreignKey: 'accountId', as: 'journal' });
Journal.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Journal.belongsTo(Periode, { foreignKey: 'periodeId', as: 'periode' });
Journal.belongsTo(Tag, { foreignKey: 'tagId', as: 'tag' });
Journal.belongsTo(JournalType, { foreignKey: 'journalTypeId', as: 'type' });
Journal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Journal.addScope('includeAss', {
    include: [
        { model: Account, as: 'account', attributes: ['name'], required: true },
        { model: Periode, as: 'periode', attributes: ['startDate', 'endDate'] },
        { model: Tag, as: 'tag', attributes: ['name'] },
        { model: JournalType, as: 'type', attributes: ['name'] },
        { model: User, as: 'user', attributes: ['firstName', 'lastName'] }
    ]
});

export default Journal;