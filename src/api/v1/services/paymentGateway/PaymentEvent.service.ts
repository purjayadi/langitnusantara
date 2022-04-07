import { EwalletRepository } from '../../database';
import { VaRepository } from '../../database';
import { EwalletInput } from '../../interfaces';
import User from '../../database/models/user';

class paymentEvent{
    ewallet: EwalletRepository;
    va: VaRepository;

    constructor(){
        this.ewallet = new EwalletRepository();
        this.va = new VaRepository();
    }

    async MakePayment(payment: any, data:any){
        const payloadEwallet: EwalletInput = {
            referenceID: data.noInvoice,
            // @ts-ignore
            currency: 'IDR',
            amount: data.amount,
            checkoutMethod: 'ONE_TIME_PAYMENT',
            channelCode: payment.chanelCode,
            channelProperties: {
                successRedirectURL: 'https://dashboard.xendit.co/register/1'
            },
            metadata: {
                branch_code: 'tree_branch'
            }
        };
        const traveler = await User.findOne({where: { id: data.userId}});
        const payloadVa = {
            externalID: data.noInvoice,
            name: traveler ? traveler.fullName: 'ELN',
            bankCode: payment.chanelCode,
            isClosed: true,
            suggestedAmt: data.amount,
            expectedAmt: data.amount,
        };
        switch (payment.chanelCategory) {
            case 'EWALLET':
                return this.ewallet.CreateCharge(payloadEwallet);
            case 'VIRTUAL_ACCOUNT':
                return this.va.Create(payloadVa);
        } 
    }
}

export default paymentEvent;