import Tag from '../../models/accounting/tag';
import { getAllDataFilters, paginate } from '../../../dto';
import { TagInput, TagOutput } from '../../../interfaces';

class TagRepository {
    async Tag(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allTag = Tag.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                }
            });
            return allTag;
    }

    async Create(payload: TagInput): Promise<TagOutput> {
        const tag = await Tag.create(payload);
        return tag;
    }

    async UpdateById(id: string, payload: Partial<TagInput>): Promise<TagOutput> {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedTag = await (tag as Tag).update(payload);
        return updatedTag;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteTag = await Tag.destroy({
            where: { id }
        });
        return !!deleteTag;
    }

    async FindById(id: string): Promise<TagOutput> {
        const tag = await Tag.findByPk(id);
        if (!tag) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return tag;
    }
}

export default TagRepository;