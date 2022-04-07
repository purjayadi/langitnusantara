import { Request, Response, Router } from 'express';
import { IPaymentChanel } from '../../interfaces';
import { PaymentChanelService } from '../../services';
import { getAllDataFilters } from '../../dto';
import { paginate } from '../../utils/paginate';
import { isAdmin, auth } from '../../utils/auth';
import Logger from '../../utils/logger';


const PaymentChanelApi = Router();
const service = new PaymentChanelService();

PaymentChanelApi.get('/', async (req: Request, res: Response) => {

  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetPaymentChanel(filters);
    Logger.debug(data);
    const results = paginate(data, filters?.page, filters?.limit);
    return res.status(200).send({
      success: true,
      data: results
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

PaymentChanelApi.post('/', auth, isAdmin, async (req: Request, res: Response) => {
  const PaymentChanel: IPaymentChanel = req.body;
  try {
    const data = await service.CreatePaymentChanel(PaymentChanel);
    return res.status(200).send({
      success: true,
      data: data
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

PaymentChanelApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  const PaymentChanel: IPaymentChanel = req.body;
  try {
    await service.UpdatePaymentChanel(req.params.id, PaymentChanel);
    return res.status(200).send({
      success: true,
      message: 'Update Payment Chanel successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

PaymentChanelApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeletePaymentChanel(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Payment Chanel successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

PaymentChanelApi.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetPaymentChanelById(req.params.id);
    return res.status(200).send({
      success: true,
      data: data
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

export default PaymentChanelApi;