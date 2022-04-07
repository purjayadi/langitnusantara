import { Request, Response, Router } from 'express';
import { IPartner } from '../interfaces';
import { PartnerService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const PartnerApi = Router();
const service = new PartnerService();

PartnerApi.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.Partner(filters);
    const results = paginate(data, filters?.page, filters?.limit);
    return res.status(200).send({
      success: true,
      data: results,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

PartnerApi.post('', upload.single('image'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IPartner = {
    name: req.body.name,
    image: req.file?.path,
  };
  try {
    const data = await service.CreatePartner(payload);
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

PartnerApi.patch('/:id', upload.single('image'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IPartner = {
    name: req.body.name,
    image: req.file?.path,
  };
  try {
    await service.UpdatePartner(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update hotel successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

PartnerApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeletePartner(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Hotel successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

PartnerApi.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await service.GetPartnerById(req.params.id);
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

export default PartnerApi;