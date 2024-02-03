import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { PlayerService } from 'src/app/services/player.service';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-reciption',
  templateUrl: './reciption.component.html',
  styleUrls: ['./reciption.component.css']
})
export class ReciptionComponent implements OnInit {
  public form: FormGroup;
  public players: X_TodayPlayer[] = [];
  public data: X_TodayPlayer[] = [];
  public isReady: boolean = false;
  constructor(private playerService: PlayerService, public dialog: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      mobileNumber: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.data = await this.playerService.GetTodayPlayers();
    this.players = this.data;
    this.isReady = true;
  }

  public async openCreateUserDialog(): Promise<void> {
    let tPlayer: Player = new Player(null);
    if (this.form.value.mobileNumber) {
      tPlayer = await this.playerService.GetPlayerByMobileNumber(this.form.value.mobileNumber);
    } else {
      tPlayer = new Player(null);
    }
    if (!tPlayer) {
      tPlayer = new Player(null);
      tPlayer.MobileNumber = this.form.value.mobileNumber;
    }
    const dialogRef = this.dialog.open(CreateTicketModalComponent, {
      data: tPlayer
    });

    // You can subscribe to the afterClosed() event to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
