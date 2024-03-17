import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { Lane } from '../models/Lane';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';
import { Ticket } from '../models/Ticket';
import { Player } from '../models/Player';
import { X_TodayPlayer } from '../models/X_TodayPlayers';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private serviceName: string = 'tickets';
  private url: string = `${Constants.APIServerUrl}/${this.serviceName}`
  constructor(private communicationService: CommunicationService) { }

  public async GetTodayTickets(): Promise<Ticket[]> {
    let tTickets: Ticket[] = [];
    try {
      const tUrl: string = `${this.url}?isToday=1`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tTickets.push(new Ticket(element));
        }
      }
      return tTickets;
    } catch (error) {
      console.log(error);
      return tTickets;
    }
  }

  public async DownloadFile(pFilename: string) {
    const tFileName = pFilename.split('/')[1]
    return this.communicationService.download(`${Constants.BaseServerUrl}download/${tFileName}`);
  }

  //Anonymous Call
  public async GetTicketOnLane(pLaneId: number, pIsAllStatuses: boolean = false): Promise<X_TodayPlayer> {
    let tTickets: X_TodayPlayer[] = [];
    try {
      let tStatus: string = '';
      if (pIsAllStatuses) {
        tStatus = '&allStatus=0'
      }
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/ticket?laneId=${pLaneId}${tStatus}`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, {});
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tTickets.push(new X_TodayPlayer(element));
        }
      }

      return tTickets[0];
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async GetAllTimeTickets(): Promise<X_TodayPlayer[]> {
    let tTickets: X_TodayPlayer[] = [];
    try {
      const tUrl: string = `${this.url}?alltime=1`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tTickets.push(new X_TodayPlayer(element));
        }
      }
      return tTickets;
    } catch (error) {
      console.log(error);
      return tTickets;
    }
  }

  public async GetTickets(): Promise<Ticket[]> {
    let tTickets: Ticket[] = [];
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tTickets.push(new Ticket(element));
        }
      }
      return tTickets;
    } catch (error) {
      console.log(error);
      return tTickets;
    }
  }


  public async GetTicketById(pTicketId: number, pIsAllStatuses: boolean = false): Promise<Ticket> {
    let tTicket: Ticket;
    try {
      let tStatus: string = '';
      if (pIsAllStatuses) {
        tStatus = '?allStatus=0'
      }
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/ticket/${pTicketId}${tStatus}`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, {});
      if (tResponse.result == 0) {
        const element = tResponse.payload;
        tTicket = new Ticket(element);
      }
      return tTicket;
    } catch (error) {
      console.log(error);
      return tTicket;
    }
  }

  public async GetUserTickets(pUserId): Promise<Ticket[]> {
    let tTickets: Ticket[] = [];
    try {
      const tUrl: string = `${this.url}?userId=${pUserId}`;
      const tResponse: APIResponse = await this.communicationService.getData(tUrl);
      if (tResponse.result == 0) {
        for (let index = 0; index < tResponse.payload.length; index++) {
          const element = tResponse.payload[index];
          tTickets.push(new Ticket(element));
        }
      }
      return tTickets;
    } catch (error) {
      console.log(error);
      return tTickets;
    }
  }

  public async AddTicket(pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${this.url}`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, pTicket);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async AddTicketForNewPlayer(pPlayer: Player, pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${this.url}/newPlayer`;
      const tResponse: APIResponse = await this.communicationService.postData(tUrl, {
        ticket: pTicket,
        player: pPlayer
      });
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async UpdateTicketState(pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${this.url}/updateState`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pTicket);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async UpdateTicketState_Ann(pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/updateState`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pTicket);
      return tResponse.result == -1 ? tResponse.errorCode : tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async UpdateTicketLevel_Ann(pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${Constants.APIAnonymousServerUrl}/lanes/updateLevel`;
      const tResponse: APIResponse = await this.communicationService.putData(tUrl, pTicket);
      return tResponse.result;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async DeleteTicket(pId: number): Promise<number> {
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
