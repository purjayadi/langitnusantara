import { Request, Response, Router } from 'express';
import { IPeriode } from '../../interfaces';
import { PeriodeService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

// TODO fix this
const PeriodeController = Router();
const service = new PeriodeService();
PeriodeController.get('/',  auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetPeriode(filters);
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

PeriodeController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const Periode: IPeriode = req.body;
    try {
        const data = await service.CreatePeriode(Periode);
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

PeriodeController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const Periode: IPeriode = req.body;
    try {
        await service.UpdatePeriode(req.params.id, Periode);
        return res.status(200).send({
            success: true,
            message: 'Update Periode successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

PeriodeController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeletePeriode(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Periode successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

PeriodeController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetPeriodeById(req.params.id);
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

export default PeriodeController;