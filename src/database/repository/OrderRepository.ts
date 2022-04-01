import { getAllDataFilters, paginate } from 'src/dto';
import { OrderInput, OrderOutput, IUser } from 'src/interfaces';
import Order from '../models/order';
import Logger from '../../utils/logger';

export class OrderRepository {
    // @ts-ignore
    async Order(filters?: getAllDataFilters, user: IUser): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allOrder = Order.scope(['package','user']).findAndCountAll({
                attributes: ['id', 'noInvoice', 'in', 'out', 'adult', 'children', 'price', 'discount', 'amount', 'status'],
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                ...user?.isAdmin === false && { where: { userId: user.id } },
                raw: true,
            });
            return allOrder;
    }

    async Create(payload: OrderInput): Promise<OrderOutput> {
        let { count } = await Order.findAndCountAll({
            attributes: ['noInvoice']
        });
        let invoiceNumber = 'ELN-'+ (count + 2200000 + 1);
        Logger.info(invoiceNumber);
        const order = await Order.create({
            packageId: payload.packageId,
            noInvoice: invoiceNumber,
            in: payload.in,
            out: payload.out,
            adult: payload.adult,
            children: payload.children,
            price: payload.price,
            discount: payload.discount,
            amount: payload.amount,
            status: payload.status,
            userId: payload.userId
        });
        return order;
    }

    async UpdateById(id: string, payload: Partial<OrderInput>): Promise<OrderOutput> {
        const order = await Order.findByPk(id);
        if (!order) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedOrder = await (order as Order).update(payload);
        return updatedOrder;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteOrder = await Order.destroy({
            where: { id }
        });
        return !!deleteOrder;
    }

    async FindById(id: string): Promise<OrderOutput> {
        const order = await Order.findByPk(id);
        if (!order) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return order;
    }

    async UpdateStatusById(noInvoice: string, status: string) {
        const order = await Order.update({ status: status }, { where: { noInvoice: noInvoice } });
        return order;
    }
}
