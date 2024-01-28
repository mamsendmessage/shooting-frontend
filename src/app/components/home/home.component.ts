import { Component, OnInit } from '@angular/core';
import { LaneService } from 'src/app/services/lane.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public numberOfUsers: number = 100;
  public numberOfLanes: number = 7;
  constructor(private playerService: PlayerService, private laneService: LaneService) { }

  async ngOnInit(): Promise<void> {
    // await this.getTodayPlayers();
    // await this.getLanes();
  }

  public async getTodayPlayers() {
    const tPlayers: any[] = await this.playerService.GetTodayPlayers();
    this.numberOfUsers = tPlayers.length;
  }

  public async getLanes() {
    const tLanes: any[] = await this.laneService.GetAvailableLanes();
    this.numberOfLanes = tLanes.length;
  }

}
