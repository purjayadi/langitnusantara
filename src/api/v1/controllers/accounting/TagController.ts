import { Request, Response, Router } from 'express';
import { ITag } from '../../interfaces';
import { TagService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

// TODO fix this
const TagController = Router();
const service = new TagService();
TagController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetTag(filters);
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

TagController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const Tag: ITag = req.body;
    try {
        const data = await service.CreateTag(Tag);
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

TagController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const Tag: ITag = req.body;
    try {
        await service.UpdateTag(req.params.id, Tag);
        return res.status(200).send({
            success: true,
            message: 'Update Tag successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

TagController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteTag(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Tag successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

TagController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetTagById(req.params.id);
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

export default TagController;