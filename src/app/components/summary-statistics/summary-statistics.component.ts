import { Component, OnInit } from '@angular/core';
import { Lane } from 'src/app/models/Lane';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.css']
})
export class SummaryStatisticsComponent implements OnInit {
  public isPageReady: boolean = false;
  public numberOfUsers: number = 0;
  public numberOfLanes: number = 0;
  public numberOfAvailableLanes: number = 0;
  public reservedLanes: string = '0';
  public numberOfTicket: number = 0;
  public players: X_TodayPlayer[] = [];
  constructor(private playerService: PlayerService, private laneService: LaneService, private ticketService: TicketService) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.isPageReady = true;
  }
  public async loadData(): Promise<number> {
    try {
      this.players = await this.playerService.GetTodayPlayers();
      if (this.players.length > 0) {
        this.numberOfTicket = this.players.length;
        const uniqueIds: number[] = [];
        this.players.filter(element => {
          const isDuplicate = uniqueIds.includes(element.UserId);
          if (!isDuplicate) {
            uniqueIds.push(element.UserId);
            return true;
          }
          return false;
        });
        this.numberOfUsers = uniqueIds.length;
      }
      const tLanes: Lane[] = await this.laneService.GetAllLanes();
      if (tLanes.length > 0) {
        this.numberOfLanes = tLanes.length;
      }

      const tReservedLanes: Lane[] = await this.laneService.GetReservedLanes();
      if (tReservedLanes.length > 0) {
        this.numberOfAvailableLanes = this.numberOfLanes - tReservedLanes.length;
        this.reservedLanes = tReservedLanes.map((item)=>item.Number).join('-');
      } else {
        this.numberOfAvailableLanes = this.numberOfLanes;
        this.reservedLanes = '0';
      }
      return 0;
    } catch (error) {
      return -1;
    }
  }
}
