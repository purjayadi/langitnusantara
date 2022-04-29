import Team from '../models/team';
import { getAllDataFilters, paginate } from '../../dto';
import { TeamInput, TeamOutput } from '../../interfaces';

class TeamRepository {
    async Team(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allTeam = Team.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            return allTeam;
    }

    async Create(payload: TeamInput): Promise<TeamOutput> {
        const team = await Team.create(payload);
        return team;
    }

    async UpdateById(id: string, payload: Partial<TeamInput>): Promise<TeamOutput> {
        const team = await Team.findByPk(id);
        if (!team) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedTeam = await (team as Team).update(payload);
        return updatedTeam;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteTeam = await Team.destroy({
            where: { id }
        });
        return !!deleteTeam;
    }

    async FindById(id: string): Promise<TeamOutput> {
        const team = await Team.findByPk(id);
        if (!team) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return team;
    }
}

export default TeamRepository;