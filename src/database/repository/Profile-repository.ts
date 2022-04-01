import Profile from '../models/profile';
import { getAllDataFilters, paginate } from 'src/dto';
import { ProfileInput, ProfileOutput } from 'src/interfaces';

class ProfileRepository {
    async Profile(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allProfile = Profile.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allProfile;
    }

    async Create(payload: ProfileInput): Promise<ProfileOutput> {
        const profile = await Profile.create(payload);
        return profile;
    }

    async UpdateById(id: string, payload: Partial<ProfileInput>): Promise<ProfileOutput> {
        const profile = await Profile.findByPk(id);
        if (!profile) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedProfile = await (profile as Profile).update(payload);
        return updatedProfile;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteProfile = await Profile.destroy({
            where: { id }
        });
        return !!deleteProfile;
    }

    async FindById(id: string): Promise<ProfileOutput> {
        const profile = await Profile.findByPk(id);
        if (!profile) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return profile;
    }
}

export default ProfileRepository;