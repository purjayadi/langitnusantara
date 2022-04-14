import { Request, Response, Router } from 'express';
import { IBeginningBalance } from '../../interfaces';
import { BeginningBalanceService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';
import Logger from '../../utils/logger';

const BeginningBalanceController = Router();
const service = new BeginningBalanceService();
BeginningBalanceController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetBeginningBalance(filters);
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

BeginningBalanceController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const BeginningGetBeginningBalance: IBeginningBalance = req.body;
    Logger.debug(BeginningGetBeginningBalance);
    try {
        const data = await service.CreateBeginningBalance(BeginningGetBeginningBalance);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

BeginningBalanceController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const BeginningGetBeginningBalance: IBeginningBalance = req.body;
    try {
        await service.UpdateBeginningBalance(req.params.id, BeginningGetBeginningBalance);
        return res.status(200).send({
            success: true,
            message: 'Update BeginningGetBeginningBalance successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

BeginningBalanceController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteBeginningBalance(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete BeginningGetBeginningBalance successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

BeginningBalanceController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetBeginningBalanceById(req.params.id);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

export default BeginningBalanceController;