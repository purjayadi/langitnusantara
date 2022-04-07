import { DestinationRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { DestinationInput } from '../interfaces';

class DestinationService {
  repository: DestinationRepository;

  constructor() {
    this.repository = new DestinationRepository();
  }

  async GetDestination(filters: getAllDataFilters): Promise<paginate> {
    return this.repository.Destination(filters);
  }

  async CreateDestination(payload: DestinationInput) {
    return this.repository.Create(payload);
  }

  async UpdateDestination(id: string, payload: DestinationInput) {
    return this.repository.UpdateById(id, payload);
  }

  async DeleteDestination(id: string) {
    return this.repository.DeleteById(id);
  }

  async GetDestinationById(id: string) {
    return this.repository.FindById(id);
  }

  async GetDestinationBySlug(slug: string) {
    return this.repository.FindBySlug(slug);
  }

  async GetDestinationPayload(Destination: any) {
    if (Destination) {
      return Destination;
    } else {
      return ({ error: 'No Destination Available' });
    }
  }
}

export default DestinationService;