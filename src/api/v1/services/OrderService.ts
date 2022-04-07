import { OrderRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { OrderInput, IUser } from '../interfaces';

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

    async UpdateStatusOrder(noInvoice: string, status: string) {
        return this.repository.UpdateStatusById(noInvoice, status);
    }

}

export default OrderService;