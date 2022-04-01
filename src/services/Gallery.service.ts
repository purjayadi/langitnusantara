import { GalleryRepository } from '../../src/database';
import { getAllDataFilters, paginate } from '../dto';
import { GalleryInput } from '../interfaces';

class GalleryService{
    repository: GalleryRepository;
  
    constructor(){
      this.repository = new GalleryRepository();
    }
  
    async Gallery(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Gallery(filters);
    }
  
    async CreateGallery(payload: GalleryInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateGallery(id:string, payload: GalleryInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteGallery(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetGalleryById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetGalleryPayload(Gallery:any){
  
      if(Gallery){
          return Gallery;
      }else{
          return ({error: 'No Gallery Available'});
      }
    }
  }
  
  export default GalleryService;