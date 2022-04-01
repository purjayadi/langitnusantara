import PaymentChanel from '../../models/PaymentChanel';
import { getAllDataFilters, paginate } from 'src/dto';
import { PaymentChanelInput, PaymentChanelOutput } from 'src/interfaces';

class PaymentChanelRepository {
    async PaymentChanel(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allPaymentChanel = PaymentChanel.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allPaymentChanel;
    }

    async Create(payload: PaymentChanelInput): Promise<PaymentChanelOutput> {
        const paymentChanel = await PaymentChanel.create(payload);
        return paymentChanel;
    }

    async UpdateById(id: string, payload: Partial<PaymentChanelInput>): Promise<PaymentChanelOutput> {
        const paymentChanel = await PaymentChanel.findByPk(id);
        if (!paymentChanel) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedPaymentChanel = await (paymentChanel as PaymentChanel).update(payload);
        return updatedPaymentChanel;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deletePaymentChanel = await PaymentChanel.destroy({
            where: { id }
        });
        return !!deletePaymentChanel;
    }

    async FindById(id: string): Promise<PaymentChanelOutput> {
        const paymentChanel = await PaymentChanel.findByPk(id);
        if (!paymentChanel) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return paymentChanel;
    }
}

export default PaymentChanelRepository;