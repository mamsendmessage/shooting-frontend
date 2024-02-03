import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Constants } from 'src/app/models/Constants';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})
export class CreateTicketModalComponent implements OnInit {
  public ticketForm: FormGroup;
  public webcamImage: WebcamImage = null;
  public image: string = '';

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    private ticketService: TicketService, @Inject(MAT_DIALOG_DATA) public pPlayer: Player) {

    if (pPlayer && pPlayer.ID > 0) {
      this.image = Constants.BaseServerUrl + pPlayer.Photo.replace('images', '');
      this.ticketForm = this.fb.group({
        nameOfPlayer: [pPlayer.Name, Validators.required],
        nationality: [pPlayer.NationalityId, Validators.required],
        mobileNumber: [pPlayer.MobileNumber, Validators.required],
        age: [pPlayer.Age, Validators.required],
        gameType: ['', Validators.required],
        levelOfPlayer: ['', Validators.required],
        sessionTime: ['', Validators.required],
        laneId: ['', Validators.required],
        photo: [],
      });
    } else {
      this.ticketForm = this.fb.group({
        nameOfPlayer: ['', Validators.required],
        nationality: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        age: ['', Validators.required],
        gameType: ['', Validators.required],
        levelOfPlayer: ['', Validators.required],
        sessionTime: ['', Validators.required],
        photo: [''],
      });
    }

  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
    location.reload();
  }
  async onSubmit() {
    if (this.ticketForm.valid) {
      const tPlayer: Player = new Player(null);
      tPlayer.Age = this.ticketForm.value.age;
      tPlayer.MobileNumber = this.ticketForm.value.mobileNumber;
      tPlayer.Name = this.ticketForm.value.nameOfPlayer;
      tPlayer.NationalityId = 1;
      tPlayer.Photo = this.webcamImage.imageAsBase64;
      const tTicket: Ticket = new Ticket(null);
      tTicket.UserId = tPlayer.ID;
      tTicket.GameTypeId = this.ticketForm.value.gameType;
      tTicket.PlayerLevelId = this.ticketForm.value.levelOfPlayer;
      tTicket.SessionTimeId = this.ticketForm.value.sessionTime;
      tTicket.State = 0;
      tTicket.LaneId = this.ticketForm.value.laneId;
      const tResult: number = await this.ticketService.AddTicketForNewPlayer(tPlayer, tTicket);
      if (tResult == 0) {
        this.close();
      }
    }
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.image = webcamImage.imageAsDataUrl;
    this.ticketForm.value.photo = webcamImage.imageAsBase64;
  }

  handleLaneSelected(pValue) {
    this.ticketForm.value.laneId = pValue;
  }

}
