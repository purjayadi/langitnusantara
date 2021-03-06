import { VaRepository } from '../../database';

class VaService{
    repository: VaRepository;

    constructor(){
        this.repository = new VaRepository();
    }

    async GetVaAvailable() {
        return this.repository.getVABanks();
    }

    async CreateVa(payment: any, data: any) {
        const payload = {
            externalID: data.noInvoice,
            name:'Traveler',
            bankCode: payment.chanelCode,
            isClosed: true,
            suggestedAmt: data.amount,
            expectedAmt: data.amount,
        };
        return this.repository.Create(payload);
    }

    async UpdateVa(id:string, expectedAmt: number) {
        return this.repository.Update(id, expectedAmt);
    }

    async GetVaById(id: string) {
        return this.repository.getById(id);
    }

    async GetVaPaymentById(paymentID: string) {
        return this.repository.getPaymentById(paymentID);
    }
}

export default VaService;