import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { APIResponse } from '../models/APIResponse';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { Constants } from '../models/Constants';
import { Player } from '../models/Player';
import { X_TodayPlayer } from '../models/X_TodayPlayers';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private serviceName: string = 'players';
  private url: string = `${Constants.APIServerUrl}/${this.serviceName}`
  constructor(private communicationService: CommunicationService) { }

  public async GetTodayPlayers(): Promise<X_TodayPlayer[]> {
    let tPlayers: X_TodayPlayer[] = [];
    try {
      const tUrl: string = `${this.url}?isToday=1`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tPlayers.push(new X_TodayPlayer(element));
        }
      }
      return tPlayers;
    } catch (error) {
      console.log(error);
      return tPlayers;
    }
  }

  public async GetActivePlayers(): Promise<Player[]> {
    const tPlayers: Player[] = [];
    try {
      const tUrl: string = `${this.url}?isToday=1`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tPlayers.push(new Player(element));
        }
      }
      return tPlayers;
    } catch (error) {
      console.log(error);
      return tPlayers;
    }
  }
  public async GetAllPlayers(): Promise<Player[]> {
    let tPlayers: Player[] = [];
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tPlayers.push(new Player(element));
        }
      }
      return tPlayers;
    } catch (error) {
      console.log(error);
      return tPlayers;
    }
  }

  public async GetPlayerByMobileNumber(pMobileNumber: string): Promise<Player> {
    try {
      const tPlayers: Player[] = [];
      const tUrl: string = `${this.url}?mobileNumber=` + pMobileNumber;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tPlayers.push(new Player(element));
        }
      }
      return tPlayers[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async AddPlayer(pPlayer: Player): Promise<number> {
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, pPlayer);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async UpdatePlayer(pPlayer: Player): Promise<number> {
    try {
      const tUrl: string = `${this.url}/${pPlayer.ID}`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pPlayer);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async DeletePlayer(pId: number): Promise<number> {
    try {
      const tUrl: string = `${this.url}/${pId}`;
      const tResponse: APIResponse = await this.communicationService.deleteData(tUrl);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
