import { PaymentChanelRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { PaymentChanelInput } from '../../interfaces';

class PaymentChanelService{
    repository: PaymentChanelRepository;
  
    constructor(){
      this.repository = new PaymentChanelRepository();
    }
  
    async GetPaymentChanel(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.PaymentChanel(filters);
    }
  
    async CreatePaymentChanel(payload: PaymentChanelInput) {
      return this.repository.Create(payload);
    }
  
    async UpdatePaymentChanel(id:string, payload: PaymentChanelInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeletePaymentChanel(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetPaymentChanelById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetPaymentChanelPayload(PaymentChanel:any){
      if(PaymentChanel){
          return PaymentChanel;
      }else{
          return ({error: 'No Payment Chanel Available'});
      }
    }
  }
  
  export default PaymentChanelService;