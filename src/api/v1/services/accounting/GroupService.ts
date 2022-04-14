import { GroupRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { GroupInput } from '../../interfaces';

class GroupService {
    repository: GroupRepository;

    constructor() {
        this.repository = new GroupRepository();
    }

    async GetGroup(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Group(filters);
    }

    async CreateGroup(payload: GroupInput) {
        return this.repository.Create(payload);
    }

    async UpdateGroup(id: string, payload: GroupInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteGroup(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetGroupById(id: string) {
        return this.repository.FindById(id);
    }

    async GetGroupPayload(Group: any) {
        if (Group) {
            return Group;
        } else {
            return ({ error: 'No Group Available' });
        }
    }
}

export default GroupService;