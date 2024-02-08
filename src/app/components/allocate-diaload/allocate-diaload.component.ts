import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/models/Constants';
import { Player } from 'src/app/models/Player';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { PlayerService } from 'src/app/services/player.service';
import { SocketCommunicationService } from 'src/app/services/socket-communication.service';

@Component({
  selector: 'app-allocate-diaload',
  templateUrl: './allocate-diaload.component.html',
  styleUrls: ['./allocate-diaload.component.css']
})
export class AllocateDialoadComponent implements OnInit {
  public isReady: boolean = false;
  public player: Player;
  public level: string;
  public photo: string;
  public numOfTickets: number;
  constructor(@Inject(MAT_DIALOG_DATA) public ticket: X_TodayPlayer, private socketService: SocketCommunicationService, private playerService: PlayerService) { }
  async ngOnInit(): Promise<void> {
    this.player = await this.playerService.GetPlayerById(this.ticket.UserId);
    this.level = this.ticket.PlayerLevel;
    this.photo = Constants.BaseServerUrl + this.player.Photo.replace('images', '');
    this.isReady = true;
  }

  public sendDataToLanePage() {
    this.socketService.emitToServer("Change", this.ticket);
  }

}
