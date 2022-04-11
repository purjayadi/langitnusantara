import { Request, Response, Router } from 'express';
import { OrderPaymentInput } from '../../interfaces';
import { isXendit } from '../../middleware/xendit.middleware';
import { OrderService, OrderPaymentService } from '../../services';
import Logger from '../../utils/logger';

const CallbackApi = Router();
    const service = new OrderService();
    const orderPayment = new OrderPaymentService();

    CallbackApi.post('/va/success', isXendit, async (req: Request, res: Response) => {
        const payload: OrderPaymentInput= {
            orderId: req.body.external_id,
            source: 'Xendit',
            externalId: req.body.payment_id,
            chanelCode: req.body.bank_code,
            accountNumber: req.body.account_number,
            amount: req.body.amount
        };
        Logger.debug(req.body);
        try {
            await service.UpdateStatusOrder(payload);
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

    CallbackApi.post('/ewallet/success', isXendit, async (req: Request, res: Response) => {
        const payload: OrderPaymentInput = {
            source: 'Xendit',
            externalId: req.body.data.id,
            orderId: req.body.data.reference_id,
            chanelCode: req.body.data.channel_code,
            accountNumber: undefined,
            amount: req.body.data.capture_amount,
        };
        Logger.info(req.body.data);
        try {
            await orderPayment.CreateOrderPayment(payload);
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

    CallbackApi.post('/outlet/success', isXendit, async (req: Request, res: Response) => {
        const payload: OrderPaymentInput = {
            source: 'Xendit',
            externalId: req.body.id,
            orderId: req.body.external_id,
            chanelCode: req.body.retail_outlet_name,
            accountNumber: req.body.payment_code,
            amount: req.body.amount,
        };
        Logger.info(req.body.data);
        try {
            await orderPayment.CreateOrderPayment(payload);
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

    CallbackApi.post('/va/create', isXendit, async (req: Request, res: Response) => {
        try {
            const payment = await service.UpdateExternalId(req.body.external_id, req.body.id);
            Logger.debug(payment);
            return res.status(200).send({
                success: true,
                message: 'Generate virtual account berhasil',
                data: payment
            });
        } catch (error: any) {
            return res.status(500).send({
                success: true,
                message: error.message,
            });
        }
    });
    
export default CallbackApi;