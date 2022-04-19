import x from '../../../config/xendit';
import { EwalletInput } from '../../../interfaces';

const { EWallet } = x;
const ewalletSpecificOptions = {};
const ew = new EWallet(ewalletSpecificOptions);

class EwalletRepository {

    async CreateCharge(payload: EwalletInput) {
        try {
            const resp = await ew.createEWalletCharge(payload);
            return resp;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    async GetChargerById(chargeID: string) {
        const resp = await ew.getEWalletChargeStatus({ chargeID: chargeID });
        return resp;
    }

}

export default EwalletRepository;