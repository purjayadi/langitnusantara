import { Request, Response, Router } from 'express';
import { LedgerService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

const LedgerController = Router();
const service = new LedgerService();
LedgerController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetLedger(filters);
        const results = paginate(data, filters?.page, filters?.limit);
        return res.status(200).send({
            success: true,
            data: results
        });
    } catch (err: any) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

export default LedgerController;