import { Request, Response, Router } from 'express';
import { IAccount } from '../../interfaces';
import { AccountService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';
import Logger from '../../utils/logger';
import { activePeriode } from '../../utils/activePeriode';

const AccountController = Router();
const service = new AccountService();
AccountController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetAccount(filters);
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

AccountController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const Account: IAccount = req.body;
    const periode = await activePeriode();
    Logger.debug(periode);
    try {
        const data = await service.CreateAccount(Account, periode);
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

AccountController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const Account: IAccount = req.body;
    try {
        await service.UpdateAccount(req.params.id, Account);
        return res.status(200).send({
            success: true,
            message: 'Update Account successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

AccountController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteAccount(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Account successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

AccountController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetAccountById(req.params.id);
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

export default AccountController;