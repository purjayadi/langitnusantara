import { EwalletRepository } from '../../database';
import { EwalletInput } from '../../interfaces';

class EwalletService{
    repository: EwalletRepository;

    constructor(){
        this.repository = new EwalletRepository();
    }

    async CreateCharge(payload: EwalletInput) {
        return this.repository.CreateCharge(payload);
    }

    async GetChargerById(chargeID: string) {
        return this.repository.GetChargerById(chargeID);
    }

}

export default EwalletService;