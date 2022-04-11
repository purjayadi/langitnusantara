import { OutletRepository } from '../../database';
import { RoInput } from '../../interfaces';

class OutletService{
    repository: OutletRepository;

    constructor(){
        this.repository = new OutletRepository();
    }

    async CreateCharge(payload: RoInput) {
        return this.repository.Create(payload);
    }

    async GetFixedPayment(paymentCode: string) {
        return this.repository.getById(paymentCode);
    }

}

export default OutletService;