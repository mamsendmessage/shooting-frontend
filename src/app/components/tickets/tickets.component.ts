import { Component, OnInit } from '@angular/core';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public data: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  constructor(private playerService: PlayerService,private breadcrumbService: BreadcrumbService) { }

  async ngOnInit(): Promise<void> {
    this.breadcrumbService.setBreadcrumb(['Application', 'Tickets']);
    this.data = await this.playerService.GetTodayPlayers();
    this.isReady = true;
  }

}
