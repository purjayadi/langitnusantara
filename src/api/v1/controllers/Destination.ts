import { Request, Response, Router } from 'express';
import { IDestination } from '../interfaces';
import { DestinationService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// TODO fix this
const DestinationApi = Router();
const service = new DestinationService();
DestinationApi.get('/', async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetDestination(filters);
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

DestinationApi.post('/', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IDestination = {
        name: req.body.name,
        banner: req.baseUrl + req.file?.path,
        isFeatured: req.body.isFeatured
    };
    try {
        const data = await service.CreateDestination(payload);
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

DestinationApi.patch('/:id', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IDestination = {
        name: req.body.name,
        banner: req.file?.path,
        isFeatured: req.body.isFeatured
    };
    try {
        await service.UpdateDestination(req.params.id, payload);
        return res.status(200).send({
            success: true,
            message: 'Update Destination successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

DestinationApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteDestination(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Destination successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

DestinationApi.get('/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetDestinationById(req.params.id);
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

DestinationApi.get('/detail/:slug', async (req: Request, res: Response) => {
    try {
        const data = await service.GetDestinationBySlug(req.params.slug);
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

export default DestinationApi;