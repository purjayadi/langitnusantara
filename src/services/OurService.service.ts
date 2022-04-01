import { ServiceRepository } from '../../src/database';
import { getAllDataFilters, paginate } from '../dto';
import { ServiceInput } from '../interfaces';

class OurService{
    repository: ServiceRepository;
  
    constructor(){
      this.repository = new ServiceRepository();
    }
  
    async GetService(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Service(filters);
    }
  
    async CreateService(payload: ServiceInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateService(id:string, payload: ServiceInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteService(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetServiceById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetServicePayload(Service:any){
  
      if(Service){
          return Service;
      }else{
          return ({error: 'No Service Available'});
      }
    }
  }
  
  export default OurService;