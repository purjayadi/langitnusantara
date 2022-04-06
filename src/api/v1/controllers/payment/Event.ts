import { Request, Response, Router } from 'express';
import { OrderPaymentInput } from '../../interfaces';
import { isXendit } from '../../middleware/xendit.middleware';
import { OrderService, OrderPaymentService } from '../../services';
import Logger from '../../utils/logger';

const EventApi = Router();
    const service = new OrderService();
    const orderPayment = new OrderPaymentService();

    EventApi.post('/payment/va/success', isXendit, async (req: Request, res: Response) => {
        const status = 'Paid';
        try {
            await service.UpdateStatusOrder(req.body.external_id, status);
            return res.status(200).send({
                success: true,
                message: 'Pembayaran berhasil',
            });
        } catch (error: any) {
            return res.status(500).send({
                success: true,
                message: error.message,
            });
        }
    });

    EventApi.post('/payment/ewallet/success', isXendit, async (req: Request, res: Response) => {
        const status = 'Paid';
        Logger.info(req.body.data);
        try {
            await service.UpdateStatusOrder(req.body.data.reference_id, status);
            return res.status(200).send({
                success: true,
                message: 'Pembayaran berhasil',
            });
        } catch (error: any) {
            return res.status(500).send({
                success: true,
                message: error.message,
            });
        }
    });

    EventApi.post('/payment/va/create', isXendit, async (req: Request, res: Response) => {
        Logger.info(req.body);
        const payload: OrderPaymentInput = {
            source: 'Xendit',
            externalId: req.body.id,
            orderId: req.body.external_id,
            chanelCode: req.body.bank_code,
            accountNumber: req.body.account_number,
            amount: req.body.amount,
        };
        try {
            await orderPayment.CreateOrderPayment(payload);
            return res.status(200).send({
                success: true,
                message: 'Generate virtual account berhasil',
            });
        } catch (error: any) {
            return res.status(500).send({
                success: true,
                message: error.message,
            });
        }
    });
    
export default EventApi;