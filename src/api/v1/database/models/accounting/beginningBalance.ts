'use strict';
import { DataTypes, Model } from 'sequelize';
import db from '../../../config/db';
import { v4 as uuid } from 'uuid';
import { IBeginningBalance, BeginningBalanceInput } from '../../../interfaces';
import Account from './account';
import Periode from './periode';
import User from '../user';

class BeginningBalance
    extends Model<IBeginningBalance, BeginningBalanceInput>
    implements IBeginningBalance {
    declare id: string;
    public accountId!: string;
    public bbDebit!: number;
    public bbCredit!: number;
    public balance!: number;
    public userId!: string;
    public periodeId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    periode: any;
    account: any;
}

// initial beginning balance
BeginningBalance.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        accountId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Accounts', // name of Target model
                key: 'id' // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        bbDebit: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        bbCredit: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        periodeId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Periodes', // name of Target model
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        }
    },
    {
        timestamps: true,
        sequelize: db
    }
);

BeginningBalance.beforeCreate((BeginningBalance) => {
    BeginningBalance.id = uuid();
});

BeginningBalance.belongsTo(Account, {
    foreignKey: 'accountId',
    targetKey: 'id',
    as: 'account'
});

Account.hasMany(BeginningBalance, {
    foreignKey: 'accountId',
    as: 'beginningBalances'
});

BeginningBalance.belongsTo(Periode, {
    foreignKey: 'periodeId',
    targetKey: 'id',
    as: 'periode'
});

// make asociation to model user
BeginningBalance.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user'
});

BeginningBalance.addScope('account', {
    include: [
        {
            model: Account,
            as: 'account',
            attributes: ['name'],
            required: true
        }
    ]
});

BeginningBalance.addScope('periode', {
    include: [
        {
            model: Periode,
            as: 'periode',
            attributes: ['startDate', 'endDate'],
            required: true
        }
    ]
});

// add scope user
BeginningBalance.addScope('user', {
    include: [
        {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName'],
            required: true
        }
    ]
});

export default BeginningBalance;