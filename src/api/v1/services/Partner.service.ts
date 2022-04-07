import { PartnerRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { PartnerInput } from '../interfaces';

class PartnerService{
    repository: PartnerRepository;
  
    constructor(){
      this.repository = new PartnerRepository();
    }
  
    async Partner(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Partner(filters);
    }
  
    async CreatePartner(payload: PartnerInput) {
      return this.repository.Create(payload);
    }
  
    async UpdatePartner(id:string, payload: PartnerInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeletePartner(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetPartnerById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetPartnerPayload(Partner:any){
  
      if(Partner){
          return Partner;
      }else{
          return ({error: 'No Partner Available'});
      }
    }
  }
  
  export default PartnerService;