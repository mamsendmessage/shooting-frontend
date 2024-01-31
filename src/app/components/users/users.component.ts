import { Component, OnInit } from '@angular/core';
import { X_TodayPlayer } from '../../models/X_TodayPlayers';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public data: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  constructor(private playerService: PlayerService) { }

  async ngOnInit(): Promise<void> {
    this.data = await this.playerService.GetTodayPlayers();
    this.isReady = true;
  }
}
