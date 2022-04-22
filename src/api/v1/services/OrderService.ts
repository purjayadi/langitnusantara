import { OrderRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { OrderInput, IUser } from '../interfaces';
import { OrderPaymentInput } from '../interfaces/Payment.interface';

class OrderService {
    repository: OrderRepository;

    constructor() {
        this.repository = new OrderRepository();
    }

    async Order(filters: getAllDataFilters, user: IUser): Promise<paginate> {
        return this.repository.Order(filters, user);
    }

    async CreateOrder(payload: OrderInput) {
        return this.repository.Create(payload);
    }

    async UpdateOrder(id: string, payload: OrderInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteOrder(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetOrderById(id: string) {
        return this.repository.FindById(id);
    }

    async GetOrderPayload(Order: any) {

        if (Order) {
            return Order;
        } else {
            return ({ error: 'No Order Available' });
        }
    }

    async UpdateStatusOrder(payload: OrderPaymentInput) {
        return this.repository.UpdateStatusOrder(payload);
    }

    async UpdateExternalId(noInvoice: string, externalId: string) {
        return this.repository.UpdateExternalIdByNoInvoice(noInvoice, externalId);
    }

    async CancelOrderById(id: string) {
        return this.repository.CancelOrderById(id);
    }

}

export default OrderService;
