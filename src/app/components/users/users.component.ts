import { Component, OnInit } from '@angular/core';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public data: X_TodayPlayer[] = [];
  public players: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  constructor(private playerService: PlayerService) { }

  async ngOnInit(): Promise<void> {
    this.data = await this.playerService.GetTodayPlayers();
    this.players = this.data;
    this.isReady = true;
  }

  public onStateChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.State == pValue.value);
    }
  }

  public onTicketTypeChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.TicketType == pValue.value);
    }
  }

  public onUserTypeChange(pValue: any) {
    if (pValue.value == "") {
      this.players = this.data;
    } else {
      this.players = this.data.filter((item) => item.UserType == pValue.value);
    }
  }
}
