import { Request, Response, Router } from 'express';
import { IPackage } from '../interfaces';
import { PackageService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const PackageController = Router();
const service = new PackageService();

PackageController.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetPackage(filters);
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

PackageController.post('', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IPackage = {
    name: req.body.name,
    noOfDay: req.body.noOfDay,
    description: req.body.description,
    categoryId: req.body.categoryId,
    destinationId: req.body.destinationId,
    isFeatured: req.body.isFeatured,
    banner: req.file?.path,
    services: req.body.services,
    itinerary: req.body.itinerary,
    price: req.body.price,
  };
  try {
    const data = await service.CreatePackage(payload);
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

PackageController.patch('/:id', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IPackage = {
    name: req.body.name,
    noOfDay: req.body.noOfDay,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
    destinationId: req.body.destinationId,
    isFeatured: req.body.isFeatured,
    banner: req.file?.path,
    services: req.body.services,
    itinerary: req.body.itinerary
  };
  try {
    await service.UpdatePackage(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update Package successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

PackageController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeletePackage(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Package successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

PackageController.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetPackageById(req.params.id);
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

PackageController.get('/detail/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetPackageBySlug(req.params.id);
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

PackageController.get('/price/:id', async (req: Request, res: Response) => {
  // @ts-ignore
  const pax: number = req.query.adult;  
  try {
    const data = await service.findPrice(req.params.id, pax);
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

export default PackageController;