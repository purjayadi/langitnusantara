import x from '../../../../config/xendit';
import { EwalletInput } from '../../../interfaces';

const { EWallet } = x;
const ewalletSpecificOptions = {};
const ew = new EWallet(ewalletSpecificOptions);

class EwalletRepository {

    async CreateCharge(payload: EwalletInput) {
        const resp = await ew.createEWalletCharge(payload);
        return resp;
    }

    async GetChargerById(chargeID: string) {
        const resp = await ew.getEWalletChargeStatus({ chargeID: chargeID });
        return resp;
    }

}

export default EwalletRepository;