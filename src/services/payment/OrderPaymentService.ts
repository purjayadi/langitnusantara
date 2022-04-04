import { OrderPaymentRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { OrderPaymentInput } from '../../interfaces';

class OrderPaymentService{
    repository: OrderPaymentRepository;
  
    constructor(){
      this.repository = new OrderPaymentRepository();
    }
  
    async GetOrderPayment(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.OrderPayment(filters);
    }
  
    async CreateOrderPayment(payload: OrderPaymentInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateOrderPayment(id:string, payload: OrderPaymentInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteOrderPayment(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetOrderPaymentById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetOrderPaymentPayload(OrderPayment:any){
      if(OrderPayment){
          return OrderPayment;
      }else{
          return ({error: 'No Payment Available'});
      }
    }
  }
  
  export default OrderPaymentService;