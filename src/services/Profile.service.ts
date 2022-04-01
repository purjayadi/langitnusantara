import { ProfileRepository } from '../../src/database';
import { getAllDataFilters, paginate } from '../dto';
import { ProfileInput } from '../interfaces';

class ProfileService{
    repository: ProfileRepository;
  
    constructor(){
      this.repository = new ProfileRepository();
    }
  
    async GetProfile(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Profile(filters);
    }
  
    async CreateProfile(payload: ProfileInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateProfile(id:string, payload: ProfileInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteProfile(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetProfileById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetProfilePayload(Profile:any){
  
      if(Profile){
          return Profile;
      }else{
          return ({error: 'No profile Available'});
      }
    }
  }
  
  export default ProfileService;