import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Constants } from 'src/app/models/Constants';
import { Nationality } from 'src/app/models/Nationality';
import { Player } from 'src/app/models/Player';
import { Ticket } from 'src/app/models/Ticket';
import { ConfigurationService } from 'src/app/services/config.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
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
  public laneId: number = -1;
  public fileName: string = 'No file selected';
  public nationalities: Nationality[] = [];
  public isFormSubmitted: boolean = false;
  public isReady: boolean = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pPlayer: Player, private ticketService: TicketService, private configService: ConfigurationService, public dialog: MatDialog) {

    if (pPlayer && pPlayer.ID > 0) {
      this.fileName = pPlayer.Document;
      this.image = pPlayer.Photo ? Constants.BaseServerUrl + pPlayer.Photo.replace('images', '') : null;
      this.ticketForm = this.fb.group({
        nameOfPlayer: [pPlayer.Name, Validators.required],
        nationality: [pPlayer.NationalityId, Validators.required],
        mobileNumber: [pPlayer.MobileNumber ? pPlayer.MobileNumber : '', Validators.required],
        age: [pPlayer.Age, Validators.required],
        gameType: ['1', Validators.required],
        levelOfPlayer: ['1', Validators.required],
        sessionTime: ['1', Validators.required],
        laneId: [''],
        photo: [''],
        document: [''],
        passportsNo: [pPlayer.PassportsNo, Validators.required],
        membershipNo: [pPlayer.MembershipNo, Validators.required],
        membershipExpiry: [new Date(pPlayer.MembershipExpiry).toISOString().split('T')[0], Validators.required]
      });
    } else {
      this.ticketForm = this.fb.group({
        nameOfPlayer: ['', Validators.required],
        nationality: ['', Validators.required],
        mobileNumber: [pPlayer.MobileNumber ? pPlayer.MobileNumber : '', Validators.required],
        age: ['', Validators.required],
        gameType: ['1', Validators.required],
        levelOfPlayer: ['1', Validators.required],
        sessionTime: ['1', Validators.required],
        laneId: [''],
        photo: [''],
        document: [''],
        passportsNo: ['', Validators.required],
        membershipNo: ['', Validators.required],
        membershipExpiry: ['', Validators.required]
      });
    }
    this.ticketForm.controls['sessionTime'].disable();
    this.ticketForm.controls['gameType'].valueChanges
      .subscribe((res: string) => {
        if (res != "3") {
          this.ticketForm.controls['sessionTime'].disable();
        } else {
          this.ticketForm.controls['sessionTime'].enable();
        }
      })
  }

  async ngOnInit() {
    this.nationalities = await this.configService.GetAllNationalites();
    this.isReady = true;
  }

  public close() {
    this.dialogRef.close();
    location.reload();
  }
  async onSubmit() {
    if (this.ticketForm.valid) {
      if (!this.isLaneValid()) {
        this.openAlertDialog('Please Select Avaiable Lane');
        return;
      }
      const tPlayer: Player = new Player(null);
      tPlayer.Age = this.ticketForm.value.age;
      tPlayer.MobileNumber = this.ticketForm.value.mobileNumber;
      tPlayer.Name = this.ticketForm.value.nameOfPlayer;
      tPlayer.NationalityId = this.ticketForm.value.nationality;
      tPlayer.Photo = this.webcamImage ? this.webcamImage.imageAsBase64 : '';
      tPlayer.Document = this.ticketForm.value.document ? this.ticketForm.value.document : '';
      tPlayer.PassportsNo = this.ticketForm.value.passportsNo;
      tPlayer.MembershipNo = this.ticketForm.value.membershipNo;
      tPlayer.MembershipExpiry = this.ticketForm.value.membershipExpiry;
      const tTicket: Ticket = new Ticket(null);
      tTicket.UserId = tPlayer.ID;
      tTicket.GameTypeId = this.ticketForm.value.gameType;
      tTicket.PlayerLevelId = this.ticketForm.value.levelOfPlayer;
      tTicket.SessionTimeId = this.ticketForm.value.sessionTime;
      tTicket.State = 2;
      tTicket.LaneId = this.laneId;
      const tResult: number = await this.ticketService.AddTicketForNewPlayer(tPlayer, tTicket);
      if (tResult == 0) {
        this.close();
      } else {
        this.openAlertDialog('An Error Occured While Performing Your Request, Please Check with the Adminstriator');
      }
    } else {
      this.isFormSubmitted = true;
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.ticketForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError] + " -> " + this.ticketForm.get(key).value);
        });
      }
    });
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.image = webcamImage.imageAsDataUrl;
    this.ticketForm.value.photo = webcamImage.imageAsBase64;
  }

  handleLaneSelected(pValue) {
    this.laneId = +pValue;
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
    if (this.isFormSubmitted && !this.ticketForm.get(pName).valid) {
      return true;
    }
    if (this.ticketForm.get(pName).touched || this.ticketForm.get(pName).dirty) {
      return !this.ticketForm.get(pName).valid;
    } else {
      return false;
    }
  }

  public isLaneValid() {
    return this.laneId > 0;
  }

  openAlertDialog(pMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {
        icon: 'Error',
        message: pMessage
      }
    });
  }

}
