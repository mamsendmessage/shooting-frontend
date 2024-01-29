import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/APIResponse';
import { Lane } from 'src/app/models/Lane';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isPageReady: boolean = false;
  public numberOfUsers: number = 0;
  public numberOfLanes: number = 0;
  public numberOfAvailableLanes: number = 0;
  public reservedLanes: string = '0';
  public numberOfTicket: number = 0;
  public players:Player[]=[];
  constructor(private playerService: PlayerService, private laneService: LaneService, private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.isPageReady = true;
  }


  public async loadData(): Promise<number> {
    try {
      this.players = await this.playerService.GetAllPlayers();
      const tTodayPlayers: Player[] = await this.playerService.GetTodayPlayers();
      if (tTodayPlayers) {
        this.numberOfUsers = tTodayPlayers.length;
      }
      const tLanes: Lane[] = await this.laneService.GetAllLanes();
      if (tLanes.length > 0) {
        this.numberOfLanes = tLanes.length;
      }

      const tReservedLanes: Lane[] = await this.laneService.GetReservedLanes();
      if (tReservedLanes.length > 0) {
        this.numberOfAvailableLanes = this.numberOfLanes - tReservedLanes.length;
        this.reservedLanes = tReservedLanes.join('-');
      } else {
        this.numberOfAvailableLanes = this.numberOfLanes;
        this.reservedLanes = '0';
      }

      const tTodayTickets:Ticket[] = await this.ticketService.GetTodayTickets();
      if (tTodayTickets.length > 0) {
        this.numberOfTicket = tTodayTickets.length;
      }
      return 0;
    } catch (error) {
      return -1;
    }
  }

}
