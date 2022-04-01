import { Optional } from 'sequelize';
import { ChannelCode, Currency } from 'xendit-node/src/ewallet/ewallet_charge';

export interface IEwallet{
    id?: string;
    referenceID: string,
    currency: Currency,
    amount: number,
    checkoutMethod: string,
    channelCode?: ChannelCode,
    channelProperties: {
        successRedirectURL: string,
    },
    metadata: {
        branch_code: string
    }
}

export interface EwalletInput extends Optional<IEwallet, 'id'> {}
export interface EwalletOutput extends Required<IEwallet> {}