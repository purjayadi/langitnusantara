import { TaxRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { TaxInput } from '../../interfaces';

class TaxService {
    repository: TaxRepository;

    constructor() {
        this.repository = new TaxRepository();
    }

    async GetTax(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Tax(filters);
    }

    async CreateTax(payload: TaxInput) {
        return this.repository.Create(payload);
    }

    async UpdateTax(id: string, payload: TaxInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteTax(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetTaxById(id: string) {
        return this.repository.FindById(id);
    }

    async GetTaxPayload(Tax: any) {
        if (Tax) {
            return Tax;
        } else {
            return ({ error: 'No Tax Available' });
        }
    }
}

export default TaxService;