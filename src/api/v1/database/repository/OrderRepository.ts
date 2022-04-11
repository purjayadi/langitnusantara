import { getAllDataFilters, paginate } from '../../dto';
import { OrderInput, OrderOutput, IUser } from '../../interfaces';
import Order from '../models/order';
import Logger from '../../utils/logger';
import OrderPayment from '../models/OrderPayment';
import { NotFoundError } from '../../utils/not-found-error';
import { OrderPaymentInput } from '../../interfaces/Payment.interface';
import { paymentEvent } from '../../services';
import User from '../models/user';
import OrderDetail from '../models/OrderDetail';

export class OrderRepository {
    event: paymentEvent;

    constructor(){
        this.event = new paymentEvent();
    }
    // @ts-ignore
    async Order(filters?: getAllDataFilters, user: IUser): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allOrder = Order.scope(['package','user','detail', 'payment']).findAndCountAll({
                attributes: ['id', 'noInvoice', 'in', 'out', 'adult', 'children', 'price', 'discount', 'amount', 'status'],
                distinct: true,
                col: 'Order.id',
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                ...user?.isAdmin === false && { where: { userId: user.id } }
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
        if (!order) {
            throw new Error('Unable to create order');
        }
        let payloadPayment;
        if (payload.payment?.chanelCategory === 'EWALLET') {
            payloadPayment = {
                referenceID: order.noInvoice,
                currency: payload.payment.currency,
                amount: payload.amount,
                checkoutMethod: 'ONE_TIME_PAYMENT',
                channelCode: payload.payment.chanelCode,
                channelProperties: {
                    successRedirectURL: payload.payment.successRedirectURL
                },
                metadata: {
                    branch_code: 'tree_branch'
                }
            };
        }
        const traveler = await User.findOne({where: { id: order.userId}});
        if (payload.payment?.chanelCategory === 'VIRTUAL_ACCOUNT') {
            if(payload.payment.chanelCode === 'BNI') {
                payloadPayment = {
                    externalID: order.noInvoice,
                    name: traveler ? traveler.fullName: 'ELN',
                    bankCode: payload.payment.chanelCode,
                    isClosed: true,
                    expectedAmt: order.amount
                };
            } else {
                payloadPayment = {
                    externalID: order.noInvoice,
                    name: traveler ? traveler.fullName: 'ELN',
                    bankCode: payload.payment.chanelCode,
                    isClosed: true,
                    suggestedAmt: order.amount,
                    expectedAmt: order.amount
                };
            }
        }
        if (payload.payment?.chanelCategory === 'RETAIL_OUTLET') {
            payloadPayment = {
                externalID: order.noInvoice,
                retailOutletName: payload.payment.chanelCode,
                name: traveler ? traveler.fullName: 'ELN',
                expectedAmt: order.amount
            };
        }
        Logger.debug(payloadPayment);
        const method = payload.payment?.chanelCategory;
        const payment = await this.event.MakePayment(method, payloadPayment);
        
        if (!payment) {
            throw new Error('Unable to create payment');
        }
        await OrderDetail.create({
            orderId: order.id,
            chanelCode: payload.payment?.chanelCode,
            chanelCategory: payload.payment?.chanelCategory,
            externalId: payment.id
        });
        return payment;
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

    async UpdateExternalIdByNoInvoice(noInvoice: string, externalId: string){
        const order = await Order.findOne({
            where: { noInvoice: noInvoice }
        });
        if (!order) {
            // @todo throw custom error
            throw new NotFoundError;
        }
        const payload = { externalPaymentId: externalId };
        const updatedOrder = await (order as Order).update(payload);
        return updatedOrder;
    }

    async UpdateStatusOrder(payload: OrderPaymentInput) {
        try {
            let status: string;
            const makePayment = await OrderPayment.create(payload);
            if (!makePayment){
                throw new Error('Ops, unable to create payment');
            }
            const payment = await OrderPayment.sum('amount', { 
                where: {
                    orderId: payload.orderId
                }
            });
            const order = await Order.sum('amount', {
                where: {
                    noInvoice: payload.orderId
                }
            });
            payment < order ? status = 'Down Payment' : status = 'Paid';
            const updateOrder = await Order.update({ status: status }, { where: { noInvoice: payload.orderId } });
            if (!updateOrder) {
                throw new Error('Ops, unable to update order status');
            }
            return updateOrder;
        } catch (error:any) {
            throw new Error('Ops, something wrong');
        }
    }
}
