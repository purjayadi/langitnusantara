import OrderPayment from '../../models/OrderPayment';
import { getAllDataFilters, paginate } from 'src/dto';
import { OrderPaymentInput, OrderPaymentOutput } from 'src/interfaces';

class OrderPaymentRepository {
    async OrderPayment(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allOrderPayment = OrderPayment.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allOrderPayment;
    }

    async Create(payload: OrderPaymentInput): Promise<OrderPaymentOutput> {
        const orderPayment = await OrderPayment.create(payload);
        return orderPayment;
    }

    async UpdateById(id: string, payload: Partial<OrderPaymentInput>): Promise<OrderPaymentOutput> {
        const orderPayment = await OrderPayment.findByPk(id);
        if (!orderPayment) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedOrderPayment = await (orderPayment as OrderPayment).update(payload);
        return updatedOrderPayment;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteOrderPayment = await OrderPayment.destroy({
            where: { id }
        });
        return !!deleteOrderPayment;
    }

    async FindById(id: string): Promise<OrderPaymentOutput> {
        const orderPayment = await OrderPayment.findByPk(id);
        if (!orderPayment) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return orderPayment;
    }
}

export default OrderPaymentRepository;