import { CategoryRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { CategoryInput } from '../interfaces';

class CategoryService{
    repository: CategoryRepository;
  
    constructor(){
      this.repository = new CategoryRepository();
    }
  
    async GetCategory(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Category(filters);
    }
  
    async CreateCategory(payload: CategoryInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateCategory(id:string, payload: CategoryInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteCategory(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetCategoryById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetCategoryPayload(Category:any){
      if(Category){
          return Category;
      }else{
          return ({error: 'No category Available'});
      }
    }
  }
  
  export default CategoryService;