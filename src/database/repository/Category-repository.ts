import Category from '../models/category';
import { getAllDataFilters, paginate } from 'src/dto';
import { CategoryInput, CategoryOutput } from 'src/interfaces';

class CategoryRepository {
    async Category(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allCategory = Category.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allCategory;
    }

    async Create(payload: CategoryInput): Promise<CategoryOutput> {
        const category = await Category.create(payload);
        return category;
    }

    async UpdateById(id: string, payload: Partial<CategoryInput>): Promise<CategoryOutput> {
        const category = await Category.findByPk(id);
        if (!category) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedCategory = await (category as Category).update(payload);
        return updatedCategory;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteCategory = await Category.destroy({
            where: { id }
        });
        return !!deleteCategory;
    }

    async FindById(id: string): Promise<CategoryOutput> {
        const category = await Category.findByPk(id);
        if (!category) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return category;
    }
}

export default CategoryRepository;