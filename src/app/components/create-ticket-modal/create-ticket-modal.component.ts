import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Constants } from 'src/app/models/Constants';
import { Nationality } from 'src/app/models/Nationality';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { X_TodayPlayer } from 'src/app/models/X_TodayPlayers';
import { ConfigurationService } from 'src/app/services/config.service';
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
  public fileName: string = 'No file selected';
  public nationalities: Nationality[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    private ticketService: TicketService, @Inject(MAT_DIALOG_DATA) public pPlayer: Player, private configService: ConfigurationService) {

    if (pPlayer && pPlayer.ID > 0) {
      this.fileName = pPlayer.Document;
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
        photo: [''],
        document: [''],
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
        laneId: ['', Validators.required],
        photo: [''],
        document: [''],
      });
    }

  }

  async ngOnInit() {
    this.nationalities = await this.configService.GetAllNationalites();
  }

  public close() {
    this.dialogRef.close();
    location.reload();
  }
  async onSubmit() {
    if (true) {
      const tPlayer: Player = new Player(null);
      tPlayer.Age = this.ticketForm.value.age;
      tPlayer.MobileNumber = this.ticketForm.value.mobileNumber;
      tPlayer.Name = this.ticketForm.value.nameOfPlayer;
      tPlayer.NationalityId = this.ticketForm.value.nationality;
      tPlayer.Photo = this.webcamImage.imageAsBase64;
      tPlayer.Document = this.ticketForm.value.document;
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

  onSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    this.ticketForm.patchValue({ document: file });
    this.ticketForm.get('document').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.ticketForm.value.document = reader.result;
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }

  public isAttributeIsNotValid(pName) {
    if (this.ticketForm.get(pName).touched || this.ticketForm.get(pName).dirty) {
      return !this.ticketForm.get(pName).valid;
    } else {
      return false;
    }
  }

}
