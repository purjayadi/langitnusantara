import { Request, Response, Router } from 'express';
import Logger from '../../utils/logger';
import { auth } from '../../utils/auth';
import { EwalletService } from '../../services';
import { EwalletInput } from '../../interfaces';
import instance from '../../utils/axios';

const TestApi = Router();
    const service = new EwalletService();

    TestApi.post('/payment/ewallet', auth, async (req: Request, res: Response) => {
        const payload: EwalletInput = req.body;
        Logger.debug(payload);
        try {
            const ewallet = await service.CreateCharge(payload);
            return res.status(200).json({
                success: true,
                data: ewallet,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });

    TestApi.get('/payment/ewallet/:id', auth, async (req: Request, res: Response) => {
        try {
            const ewallet = await service.GetChargerById(req.params.id);
            return res.status(200).json({
                success: true,
                data: ewallet,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });

    TestApi.get('/payment/transaction', async (req: Request, res: Response) => {
        try {
            const transactions = await instance.get('transactions');
            return res.status(200).json({
                success: true,
                data: transactions.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });

export default TestApi;