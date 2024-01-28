import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private communicationService: CommunicationService,
    private userManagementService: UserManagementService) { }

  public async GetTodayPlayers(): Promise<any[]> {
    let  tPlayers: any[] = [];
    try {
      let tResult: Result = Result.ERROR;
      const tUrl: string = 'http://localhost:2024/api/players?isToday=1';
      const tResponse = await this.communicationService.getData(tUrl);
      if (tResponse && tResponse.payload) {
        tPlayers = tResponse.payload;
      }
      return tPlayers;
    } catch (error) {
      console.log(error);
      return tPlayers;
    }
  }

  public async SignUp(pUser: User): Promise<Result> {
    try {
      let tResult: Result = Result.ERROR;
      const tUrl: string = 'http://serverip:port//signup';
      const tData = await this.communicationService.postData(tUrl, pUser);
      return Result.SUCCESS;
    } catch (error) {
      console.log(error);
      return Result.ERROR;
    }
  }
}
