import { Request, Response } from 'express';
import { IGallery } from '../interfaces';
import { GalleryService } from '../services';
import { getAllDataFilters } from 'src/dto';

export = (app:any) => {
  const service = new GalleryService();

  app.get('/gallery', async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query
    try {
      const data = await service.Gallery(filters);
      return res.status(200).send({
        success: true,
        data: data
      });
    } catch (err:any) {
      return res.status(500).send({
        success: false,
        message: err.message
      });
    }
  });

  app.post('/gallery', async (req: Request, res: Response) => {
      const gallery:IGallery = req.body;
      try {
        const data = await service.CreateGallery(gallery);
        return res.status(200).send({
            success: true,
            data: data
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.patch('/gallery/:id', async (req: Request, res: Response) => {
      const gallery:IGallery = req.body;
      try {
        await service.UpdateGallery(req.params.id, gallery);
        return res.status(200).send({
            success: true,
            message: 'Update gallery successfully'
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.delete('gallery/:id', async (req: Request, res: Response) => {
    try {
        await service.DeleteGallery(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete gallery successfully'
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });

  app.get('/gallery/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetGalleryById(req.params.id);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });
}