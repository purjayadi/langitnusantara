import { Request, Response, Router } from 'express';
import { VaService, EwalletService, OutletService } from '../../services';
import { auth } from '../../utils/auth';

const Payment = Router();
// eslint-disable-next-line no-unused-vars
const va = new VaService();
const ewallet = new EwalletService();
const outlet = new OutletService(); 

Payment.get('/va/:id', auth, async (req: Request, res: Response) => {
    try {
        const payment = await va.GetVaById(req.params.id);
        return res.status(200).send({
            success: true,
            data: payment
        });
    } catch (error: any) {
        return res.status(error.status).send({
            success: false,
            message: error.message
        });
    }
});

Payment.get('/ewallet/:id', auth, async (req: Request, res: Response) => {
    try {
        const payment = await ewallet.GetChargerById(req.params.id);
        return res.status(200).send({
            success: true,
            data: payment
        });
    } catch (error: any) {
        return res.status(error.status).send({
            success: false,
            message: error.message
        });
    }
});

Payment.get('/outlet/:id', auth, async (req: Request, res: Response) => {
    try {
        const ewallet = await outlet.GetFixedPayment(req.params.id);
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


export default Payment;
