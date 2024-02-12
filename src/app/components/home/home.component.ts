import { Component, OnInit } from '@angular/core';
import { Lane } from 'src/app/models/Lane';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';
import { TicketService } from 'src/app/services/ticket.service';
import * as Highcharts from 'highcharts';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isReady: boolean = false;
  public numberOfUsers: number = 0;
  public numberOfLanes: number = 0;
  public numberOfAvailableLanes: number = 0;
  public reservedLanes: string = '0';
  public numberOfTicket: number = 0;
  public players: X_TodayPlayer[] = [];
  public data: X_TodayPlayer[] = [];
  public itemPerPage: number = 5;

  public Highcharts: typeof Highcharts = Highcharts;

  public chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  constructor(private playerService: PlayerService, private laneService: LaneService, private ticketService: TicketService
    ,private breadcrumbService: BreadcrumbService) { }

  async ngOnInit(): Promise<void> {
    this.breadcrumbService.setBreadcrumb(['Application', 'Dashboard']);
    await this.loadData();
    this.isReady = true;
  }


  public async loadData(): Promise<number> {
    try {
      this.data = await this.playerService.GetTodayPlayers();
      this.players = this.data;
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
        this.reservedLanes = tReservedLanes.map((item) => item.Number).join('-');
      } else {
        this.numberOfAvailableLanes = this.numberOfLanes;
        this.reservedLanes = '0';
      }
      return 0;
    } catch (error) {
      return -1;
    }
  }

  public updateItemPerPage(pValue: any) {
    if (isNaN(pValue)) {
    } else {
      this.itemPerPage = pValue;
    }
  }
}
