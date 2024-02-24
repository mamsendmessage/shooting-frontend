import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public data: Player[] = [];
  public isReady: boolean = false;
  constructor(private playerService: PlayerService, private breadcrumbService: BreadcrumbService) { }

  async ngOnInit(): Promise<void> {
    this.breadcrumbService.setBreadcrumb(['Application', 'Users']);
    this.data = await this.playerService.GetAllPlayers();
    this.isReady = true;
  }
}
