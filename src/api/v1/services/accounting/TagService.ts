import { TagRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { TagInput } from '../../interfaces';

class TagService{
    repository: TagRepository;
  
    constructor(){
      this.repository = new TagRepository();
    }
  
    async GetTag(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Tag(filters);
    }
  
    async CreateTag(payload: TagInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateTag(id:string, payload: TagInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteTag(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetTagById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetTagPayload(Tag:any){
      if(Tag){
          return Tag;
      }else{
          return ({error: 'No Tag Available'});
      }
    }
  }
  
  export default TagService;