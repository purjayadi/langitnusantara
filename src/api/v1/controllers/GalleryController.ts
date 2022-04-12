import { Request, Response, Router } from 'express';
import { IGallery } from '../interfaces';
import { GalleryService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const GalleryController = Router();
const service = new GalleryService();

GalleryController.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.Gallery(filters);
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

GalleryController.post('', upload.single('name'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IGallery = {
    name: req.file?.path,
    isSlider: req.body.isSlider
  };
  try {
    const data = await service.CreateGallery(payload);
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

GalleryController.patch('/:id', upload.single('name'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IGallery = {
    name: req.file?.path,
    isSlider: req.body.isSlider
  };
  try {
    await service.UpdateGallery(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update gallery successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

GalleryController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteGallery(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete gallery successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

GalleryController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await service.GetGalleryById(req.params.id);
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

export default GalleryController;