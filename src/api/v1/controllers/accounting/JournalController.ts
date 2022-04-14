import { Request, Response, Router } from 'express';
import { IJournal } from '../../interfaces';
import { JournalService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';
import Logger from '../../utils/logger';

const JournalController = Router();
const service = new JournalService();
JournalController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetJournal(filters);
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

JournalController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IJournal = req.body;
    try {
        const data = await service.CreateJournal(payload);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (error: any) {
        Logger.debug(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

JournalController.patch('/:code/update', auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IJournal = req.body;
    try {
        await service.UpdateJournal(req.params.code, payload);
        return res.status(200).send({
            success: true,
            message: 'Update Journal successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

JournalController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteJournal(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Journal successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

JournalController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetJournalById(req.params.id);
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

JournalController.get('/:code/entries', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetJournalByCode(req.params.code);
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

export default JournalController;