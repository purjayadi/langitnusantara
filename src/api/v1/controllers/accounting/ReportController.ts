import { Request, Response, Router } from 'express';
import { ReportService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { isAdmin, auth } from '../../utils/auth';

const ReportController = Router();
const service = new ReportService();
ReportController.get('/trial-balance', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetTrialBalance(filters);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

ReportController.get('/balance-sheet', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetBalanceSheet();
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

export default ReportController;