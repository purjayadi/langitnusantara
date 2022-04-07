import { Request, Response, Router } from 'express';
import { ITeam } from '../interfaces';
import { TeamService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const TeamApi = Router();
const service = new TeamService();

TeamApi.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.Team(filters);
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

TeamApi.post('', auth, isAdmin, upload.single('photo'), async (req: Request, res: Response) => {
  const payload: ITeam = {
    name: req.body.name,
    photo: req.file?.path,
    position: req.body.position,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram
  };
  try {
    const data = await service.CreateTeam(payload);
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

TeamApi.patch('/:id', auth, isAdmin, upload.single('photo'), async (req: Request, res: Response) => {
  const payload: ITeam = {
    name: req.body.name,
    photo: req.file?.path,
    position: req.body.position,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram
  };
  try {
    await service.UpdateTeam(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update Team successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

TeamApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteTeam(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Team successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

TeamApi.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await service.GetTeamById(req.params.id);
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

export default TeamApi;