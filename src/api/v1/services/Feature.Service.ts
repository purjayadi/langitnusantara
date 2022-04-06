import { FeatureRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { FeatureInput } from '../interfaces';

class FeatureService{
    repository: FeatureRepository;
  
    constructor(){
      this.repository = new FeatureRepository();
    }
  
    async GetFeature(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Feature(filters);
    }
  
    async CreateFeature(payload: FeatureInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateFeature(id:string, payload: FeatureInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteFeature(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetFeatureById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetFeaturePayload(Feature:any){
  
      if(Feature){
          return Feature;
      }else{
          return ({error: 'No Feature Available'});
      }
    }
  }
  
  export default FeatureService;