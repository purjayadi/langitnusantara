import { Request, Response } from 'express';
import { isXendit } from '../../middleware/xendit.middleware';
import { OrderService } from '../../services';
import Logger from '../../utils/logger';

export = (app: any) => {
    const service = new OrderService();

    app.post('/event/payment/va/success', isXendit, async (req: Request, res: Response) => {
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

    app.post('/event/payment/ewallet/success', isXendit, async (req: Request, res: Response) => {
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

    app.post('/event/order/create', isXendit, async (req: Request, res: Response) => {
        return res.status(200).send({
            success: true,
            message: 'success create va',
        });
    });

};