import { getAllDataFilters, paginate } from 'src/dto';
import { ReviewInput, ReviewOutput } from 'src/interfaces';
import Review from '../models/review';

class ReviewRepository {
    async Review(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allReview = Review.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allReview;
    }

    async Create(payload: ReviewInput): Promise<ReviewOutput> {
        const review = await Review.create(payload);
        return review;
    }

    async UpdateById(id: string, payload: Partial<ReviewInput>): Promise<ReviewOutput> {
        const review = await Review.findByPk(id);
        if (!review) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedReview = await (review as Review).update(payload);
        return updatedReview;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteReview = await Review.destroy({
            where: { id }
        });
        return !!deleteReview;
    }

    async FindById(id: string): Promise<ReviewOutput> {
        const review = await Review.findByPk(id);
        if (!review) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return review;
    }
}

export default ReviewRepository;