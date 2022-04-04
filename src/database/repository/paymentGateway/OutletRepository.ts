import x from '../../../../config/xendit';
import { RoInput } from '../../../interfaces';

const RetailOutlet = x.RetailOutlet;
const Ro = new RetailOutlet({});

class RoRepository {

    async Create(payload: RoInput) {
        try {
            const fixedPaymentCode = await Ro.createFixedPaymentCode(payload);
            return fixedPaymentCode;
        } catch (error:any) {
            return error;
        }
    }

    async Update(id: string, name:string, expectedAmt: number)
    {
        const updateFixedPaymentCode = await Ro.updateFixedPaymentCode({ id, name, expectedAmt });
        return updateFixedPaymentCode;
    }

    async getById(id: string) {
        const fixedAcc = await Ro.getFixedPaymentCode({ id: id });
        return fixedAcc;
    }

}

export default RoRepository;