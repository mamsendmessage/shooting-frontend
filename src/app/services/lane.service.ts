import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Result } from '../models/enums';
import { User } from '../models/user';
import { UserManagementService } from './user-management.service';
import { Lane } from '../models/Lane';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';

@Injectable({
  providedIn: 'root'
})
export class LaneService {

  private serviceName: string = 'lanes';
  private url: string = `${Constants.APIServerUrl}/${this.serviceName}`
  constructor(private communicationService: CommunicationService) { }

  public async GetReservedLanes(): Promise<Lane[]> {
    const tLanes: Lane[] = [];
    try {
      const tUrl: string = `${this.url}?state=1`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tLanes.push(new Lane(element));
        }
      }
      return tLanes;
    } catch (error) {
      console.log(error);
      return tLanes;
    }
  }

  public async GetLaneByNumber(pNumber: number) {
    const tLanes: Lane[] = [];
    try {
      const tUrl: string = `${this.url}?number=${pNumber}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tLanes.push(new Lane(element));
        }
      }
      return tLanes;
    } catch (error) {
      console.log(error);
      return tLanes;
    }
  }

  public async GetAllLanes(): Promise<Lane[]> {
    let tLanes: Lane[] = [];
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tLanes.push(new Lane(element));
        }
      }
      return tLanes;
    } catch (error) {
      console.log(error);
      return tLanes;
    }
  }

  public async AddLane(pLane: Lane): Promise<number> {
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, pLane);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async UpdateLane(pLane: Lane): Promise<number> {
    try {
      const tUrl: string = `${this.url}/${pLane.ID}`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pLane);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async DeleteLane(pId: number): Promise<number> {
    try {
      const tUrl: string = `${this.url}/${pId}`;
      const tResponse: APIResponse = await this.communicationService.deleteData(tUrl);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async GetLaneByID(pId: number) {
    let tLane: Lane;;
    try {
      const tUrl: string = `${this.url}/${pId}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        const element = tResponse.payload;
        tLane = new Lane(element);
      }
      return tLane;
    } catch (error) {
      console.log(error);
      return tLane;
    }
  }
}
