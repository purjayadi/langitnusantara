import { Request, Response, Router } from 'express';
import { IJournalType } from '../../interfaces';
import { JournalTypeService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

// controller journal type
const JournalTypeController = Router();
const service = new JournalTypeService();

// get all journal type
JournalTypeController.get('', auth, isAdmin, async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetJournalType(filters);
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

// create journal type
JournalTypeController.post('', auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IJournalType = req.body;
    try {
        const data = await service.CreateJournalType(payload);
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

// update journal type
JournalTypeController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IJournalType = req.body;
    try {
        await service.UpdateJournalType(req.params.id, payload);
        return res.status(200).send({
            success: true,
            message: 'Update journal type successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// delete journal type
JournalTypeController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteJournalType(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete journal type successfully'
        });
    }
    catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// Get journal type by ID
JournalTypeController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetJournalTypeById(req.params.id);
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

export default JournalTypeController;
