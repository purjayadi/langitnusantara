import { TransactionRepository } from '../../database';
import { ITransaction } from '../../interfaces';

class TransactionService{
    repository: TransactionRepository;

    constructor(){
        this.repository = new TransactionRepository();
    }

    async GetTransaction(payload: ITransaction) {
        return this.repository.getAllTransactions(payload);
    }

}

export default TransactionService;