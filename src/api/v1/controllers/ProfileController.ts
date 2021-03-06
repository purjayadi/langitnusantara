import { Request, Response, Router } from 'express';
import { IProfile } from '../interfaces';
import { ProfileService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const ProfileController = Router();
const service = new ProfileService();

ProfileController.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetProfile(filters);
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

ProfileController.post('', auth, isAdmin, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), async (req: any, res: Response) => {
  console.log(req.files);

  const payload: IProfile = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    logo: req.files?.logo[0].path,
    favicon: req.files?.favicon[0].path,
    description: req.body.description,
  };
  try {
    const data = await service.CreateProfile(payload);
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

ProfileController.patch('/:id', auth, isAdmin, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), async (req: any, res: Response) => {
  const payload: IProfile = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    logo: req.files?.logo[0].path,
    favicon: req.files?.favicon[0].path,
    description: req.body.description,
  };
  try {
    await service.UpdateProfile(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update Profile successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

ProfileController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteProfile(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Profile successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

ProfileController.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetProfileById(req.params.id);
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

export default ProfileController;
