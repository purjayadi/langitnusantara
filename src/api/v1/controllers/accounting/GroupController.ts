import { Request, Response, Router } from 'express';
import { IGroup } from '../../interfaces';
import { GroupService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';

const GroupController = Router();
const service = new GroupService();
GroupController.get('/', auth, isAdmin, async (req: Request, res: Response) => {

    const filters: getAllDataFilters = req.query;
    try {
        const data = await service.GetGroup(filters);
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

GroupController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
    const Group: IGroup = req.body;
    try {
        const data = await service.CreateGroup(Group);
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

GroupController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const Group: IGroup = req.body;
    try {
        await service.UpdateGroup(req.params.id, Group);
        return res.status(200).send({
            success: true,
            message: 'Update Group successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

GroupController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteGroup(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete Group successfully'
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

GroupController.get('/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetGroupById(req.params.id);
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

export default GroupController;