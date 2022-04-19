import Group from '../../models/accounting/group';
import { getAllDataFilters, paginate } from '../../../dto';
import { GroupInput, GroupOutput } from '../../../interfaces';

class GroupRepository {
    async Group(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allGroup = Group.scope('children').findAndCountAll({
                attributes: {exclude: [ 'parentId']}, 
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive }),
                    parentId: null
                },
                order: [['code', 'asc']]
            });
            return allGroup;
    }

    async Create(payload: GroupInput): Promise<GroupOutput> {
        const group = await Group.create(payload);
        return group;
    }

    async UpdateById(id: string, payload: Partial<GroupInput>): Promise<GroupOutput> {
        const group = await Group.findByPk(id);
        if (!group) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedGroup = await (group as Group).update(payload);
        return updatedGroup;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteGroup = await Group.destroy({
            where: { id }
        });
        return !!deleteGroup;
    }

    async FindById(id: string): Promise<GroupOutput> {
        const group = await Group.findByPk(id);
        if (!group) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return group;
    }
}

export default GroupRepository;