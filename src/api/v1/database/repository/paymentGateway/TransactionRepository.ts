import x from '../../../../../config/xendit';
import { ITransaction } from '../../../interfaces';

const { Transaction } = x;
const transactionSpecificOptions = {};
const t = new Transaction(transactionSpecificOptions);

class TransactionRepository {

    async getAllTransactions(payload: ITransaction){
        const resp = await t.listTransactions(payload);
        return resp;
    }

}

export default TransactionRepository;