import { Request, Response, Router } from 'express';
import { ITax } from '../../interfaces';
import { TaxService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

// TODO fix this
const TaxController = Router();
const service = new TaxService();
TaxController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetTax(filters);
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

TaxController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const Tax: ITax = req.body;
    try {
        const data = await service.CreateTax(Tax);
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

TaxController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const Tax: ITax = req.body;
    try {
        await service.UpdateTax(req.params.id, Tax);
        return res.status(200).send({
            success: true,
            message: 'Update Tax successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

TaxController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteTax(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Tax successfully'
        });
    } catch (error: any) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message
        });
    }
});

TaxController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetTaxById(req.params.id);
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

export default TaxController;