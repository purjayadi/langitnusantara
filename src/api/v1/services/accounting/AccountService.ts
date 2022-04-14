import { AccountRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { AccountInput } from '../../interfaces';

class AccountService {
    repository: AccountRepository;

    constructor() {
        this.repository = new AccountRepository();
    }

    async GetAccount(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Account(filters);
    }

    async CreateAccount(payload: AccountInput, periode:any) {
        return this.repository.Create(payload, periode);
    }

    async UpdateAccount(id: string, payload: AccountInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteAccount(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetAccountById(id: string) {
        return this.repository.FindById(id);
    }

    async GetAccountPayload(Account: any) {
        if (Account) {
            return Account;
        } else {
            return ({ error: 'No Account Available' });
        }
    }
}

export default AccountService;