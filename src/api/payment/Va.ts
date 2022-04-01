import { Request, Response } from 'express';
import x from '../../../config/xendit';
import Logger from '../../utils/logger';
import { isXendit } from '../../middleware/xendit.middleware';
import { auth } from '../../utils/auth';
import { VaService } from '../../services';

const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});

export = (app: any) => {
    const service = new VaService();

    app.get('/payment/bank', async (req: Request, res: Response) => {
        try {
            const bank = await service.GetVaAvailable();
            return res.status(200).json({
                success: true,
                data: bank,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });

    app.get('/xendit/va/:id', auth, async (req: Request, res: Response) => {
        const resp = await va.getFixedVA({ id: req.params.id });
        Logger.debug(resp);
        return res.status(200).send({
            success: true,
            message: 'success',
        });
    });

    app.post('/xendit/va/success', isXendit, async (req: Request, res: Response) => {
        return res.status(200).send({
            success: true,
            message: 'success',
        });
    });

    app.post('/xendit/va/create', isXendit, async (req: Request, res: Response) => {
        return res.status(200).send({
            success: true,
            message: 'success create va',
        });
    });
};