import { TeamRepository } from '../database';
import { getAllDataFilters, paginate } from '../dto';
import { TeamInput } from '../interfaces';

class TeamService{
    repository: TeamRepository;
  
    constructor(){
      this.repository = new TeamRepository();
    }
  
    async Team(filters: getAllDataFilters): Promise<paginate> {
      return this.repository.Team(filters);
    }
  
    async CreateTeam(payload: TeamInput) {
      return this.repository.Create(payload);
    }
  
    async UpdateTeam(id:string, payload: TeamInput) {
      return this.repository.UpdateById(id, payload);
    }
  
    async DeleteTeam(id:string){
      return this.repository.DeleteById(id);
    }
  
    async GetTeamById(id: string) {
      return this.repository.FindById(id);
    }
  
    async GetTeamPayload(Team:any){
  
      if(Team){
          return Team;
      }else{
          return ({error: 'No Team Available'});
      }
    }
  }
  
  export default TeamService;