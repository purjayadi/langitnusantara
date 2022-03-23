import { Router, Request, Response } from 'express'
import GalleryRoute from './GalleryRoute'
import ServiceRouter from './ServiceRoute'
import HotelRouter from './HotelRoute';

const router = Router()

router.use('/gallery', GalleryRoute)
router.use('/service', ServiceRouter)
router.use('/hotel', HotelRouter)

export default router
