import Gallery from '../models/gallery';
import { getAllDataFilters, paginate } from 'src/dto';
import { GalleryInput, GalleryOutput } from 'src/interfaces';

class GalleryRepository {
    async Gallery(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allGallery = Gallery.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allGallery;
    }

    async Create(payload: GalleryInput): Promise<GalleryOutput> {
        const gallery = await Gallery.create(payload);
        return gallery;
    }

    async UpdateById(id: string, payload: Partial<GalleryInput>): Promise<GalleryOutput> {
        const gallery = await Gallery.findByPk(id);
        if (!gallery) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedGallery = await (gallery as Gallery).update(payload);
        return updatedGallery;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteGallery = await Gallery.destroy({
            where: { id }
        });
        return !!deleteGallery;
    }

    async FindById(id: string): Promise<GalleryOutput> {
        const gallery = await Gallery.findByPk(id);
        if (!gallery) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return gallery;
    }
}

export default GalleryRepository;