import x from '../../../../config/xendit';
import { IVa } from '../../../interfaces';

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

class VaRepository {

    async getVABanks() {
        const banks = await va.getVABanks();
        return banks;
    }

    async Create(payload: IVa) {
        const fixedAcc = await va.createFixedVA(payload);
        return fixedAcc;
    }

    async Update(id: string, expectedAmt: number)
    {
        const fixedAcc = await va.updateFixedVA({ id, expectedAmt });
        return fixedAcc;
    }

    async getById(id: string) {
        const fixedAcc = await va.getFixedVA({ id: id });
        return fixedAcc;
    }

    async getPaymentById(paymentID: string) {
        const payment = await va.getVAPayment({ paymentID: paymentID });
        return payment;
    }

}

export default VaRepository;