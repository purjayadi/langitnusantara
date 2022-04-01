import { PackageRepository } from '../../src/database';
import { getAllDataFilters, paginate } from '../dto';
import { PackageInput } from '../interfaces';

class PackageService {
    repository: PackageRepository;

    constructor() {
        this.repository = new PackageRepository();
    }

    async GetPackage(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Package(filters);
    }

    async CreatePackage(payload: PackageInput) {
        return this.repository.Create(payload);
    }

    async UpdatePackage(id: string, payload: PackageInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeletePackage(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetPackageById(id: string) {
        return this.repository.FindById(id);
    }

    async GetPackageBySlug(slug: string) {
        return this.repository.FindBySlug(slug);
    }
}

export default PackageService;