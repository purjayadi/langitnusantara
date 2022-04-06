import { HotelRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { HotelInput } from '../interfaces';

class HotelService{
    repository: HotelRepository;
  
    constructor(){
      this.repository = new HotelRepository();
    }
  
    async GetHotel(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Hotel(filters);
    }
  
    async CreateHotel(payload: HotelInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateHotel(id:string, payload: HotelInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteHotel(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetHotelById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetHotelPayload(Hotel:any){
  
      if(Hotel){
          return Hotel;
      }else{
          return ({error: 'No Hotel Available'});
      }
    }
  }
  
  export default HotelService;