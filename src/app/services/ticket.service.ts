import { Injectable } from '@angular/core';
import { CommunicationService } from '../communication/communication.service';
import { Lane } from '../models/Lane';
import { APIResponse } from '../models/APIResponse';
import { Constants } from '../models/Constants';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private serviceName: string = 'tickets';
  private url: string = `${Constants.ServerUrl}/${this.serviceName}`
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

  public async UpdateTicket(pTicket: Ticket): Promise<number> {
    try {
      const tUrl: string = `${this.url}/${pTicket.ID}`;
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
