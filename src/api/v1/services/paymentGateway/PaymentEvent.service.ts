import { EwalletRepository, VaRepository, OutletRepository } from '../../database';
import Logger from '../../utils/logger';

class paymentEvent{
    ewallet: EwalletRepository;
    va: VaRepository;
    outlet: OutletRepository;

    constructor(){
        this.ewallet = new EwalletRepository();
        this.va = new VaRepository();
        this.outlet = new OutletRepository();
    }

    async MakePayment(method: any, payload:any){
        switch (method) {
            case 'EWALLET':
                Logger.info('EWALLET');
                return this.ewallet.CreateCharge(payload);
            case 'VIRTUAL_ACCOUNT':
                Logger.info('VIRTUAL_ACCOUNT');
                return this.va.Create(payload);
            case 'RETAIL_OUTLET':
                Logger.info('RETAIL_OUTLET');
                return this.outlet.Create(payload);

        } 
    }
}

export default paymentEvent;