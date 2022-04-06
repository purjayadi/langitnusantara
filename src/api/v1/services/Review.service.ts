import { ReviewRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { ReviewInput } from '../interfaces';

class ReviewService{
    repository: ReviewRepository;
  
    constructor(){
      this.repository = new ReviewRepository();
    }
  
    async Review(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Review(filters);
    }
  
    async CreateReview(payload: ReviewInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateReview(id:string, payload: ReviewInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteReview(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetReviewById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetReviewPayload(Review:any){
  
      if(Review){
          return Review;
      }else{
          return ({error: 'No Review Available'});
      }
    }
  }
  
  export default ReviewService;