import { Component, Inject, OnInit } from '@angular/core';
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
import { SessionsTime } from 'src/app/models/SessionsTime';
import { PlayerLevel } from 'src/app/models/PlayerLevel';
import { PlayerService } from 'src/app/services/player.service';
import { catchError, throwError, timeout } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-create-only-ticket-modal',
  templateUrl: './create-only-ticket-modal.component.html',
  styleUrls: ['./create-only-ticket-modal.component.css']
})
export class CreateOnlyTicketModalComponent implements OnInit {

  public ticketForm: FormGroup;
  public webcamImage: WebcamImage = null;
  public image: string = '';
  public laneId: number = -1;
  public fileName: string = 'No file selected';
  public nationalities: Nationality[] = [];
  public SessionsTime: SessionsTime[] = [];
  public PlayerLevels: PlayerLevel[] = [];
  public isPlayerFound: boolean = false;

  public playerId: number = -1;
  public playerName: string = '';
  public playerAge: string = '';
  public nationality: string = '';
  public passportsNo: string = '';
  public membershipNo: string = '';
  public document: string = '';
  public membershipExpiry: string = '';
  public filePath: string = '';
  public isFormSubmitted: boolean = false;
  public isReady: boolean = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateOnlyTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pPlayer: Player, private playerService: PlayerService, private ticketService: TicketService, private configService: ConfigurationService, public dialog: MatDialog) {

    if (pPlayer && pPlayer.ID > 0) {
      this.image = pPlayer.Photo ? Constants.BaseServerUrl + pPlayer.Photo : null;
      this.ticketForm = this.fb.group({
        mobileNumber: [],
        gameType: ['1', Validators.required],
        levelOfPlayer: ['1'],
        sessionTime: ['1', Validators.required],
        laneId: [''],
      });
    } else {
      this.ticketForm = this.fb.group({
        mobileNumber: [],
        gameType: ['1', Validators.required],
        levelOfPlayer: ['1'],
        sessionTime: ['1', Validators.required],
        laneId: [''],
      });
    }
    this.ticketForm.controls['sessionTime'].disable();
    this.ticketForm.controls['levelOfPlayer'].disable();
    this.ticketForm.controls['gameType'].disable();

    this.ticketForm.controls['gameType'].valueChanges
      .subscribe((res: string) => {
        if (res != "2") {
          this.ticketForm.controls['sessionTime'].disable();
          this.ticketForm.controls['sessionTime'].removeValidators(Validators.required);
        } else {
          this.ticketForm.controls['sessionTime'].enable();
          this.ticketForm.controls['sessionTime'].addValidators(Validators.required);
        }
      })
  }

  async ngOnInit() {
    this.nationalities = await this.configService.GetAllNationalites();
    this.SessionsTime = await this.configService.GetSessionsTime();
    this.PlayerLevels = await this.configService.GetPlayerLevel();
    this.isReady = true;
  }

  public close() {
    this.dialogRef.close();
    location.reload();
  }
  async onSubmit() {
    if (this.ticketForm.valid) {


      if (this.playerId == -1) {
        this.openAlertDialog('Please Identify The Player First');
        return;
      }

      if (!this.isLaneValid()) {
        this.openAlertDialog('Please Select Avaiable Lane');
        return;
      }

      const tTicket: Ticket = new Ticket(null);
      tTicket.UserId = this.playerId;
      tTicket.GameTypeId = this.ticketForm.value.gameType;
      tTicket.PlayerLevelId = tTicket.GameTypeId != 3 ? this.ticketForm.value.levelOfPlayer : null;
      tTicket.SessionTimeId = this.ticketForm.value.sessionTime;
      tTicket.State = 2;
      tTicket.LaneId = this.laneId;
      const tResult: number = await this.ticketService.AddTicket(tTicket);
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

  public async ChangeGameType(pGameTypeId) {
    this.PlayerLevels = await this.configService.GetPlayerLevel(pGameTypeId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.image = webcamImage.imageAsDataUrl;
    this.ticketForm.value.photo = webcamImage.imageAsBase64;
  }

  handleLaneSelected(pValue) {
    if (this.isPlayerFound) {
      this.laneId = +pValue;
    }
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

  public async CheckPlayer() {
    try {
      const tMobileNumber: string = this.ticketForm.get('mobileNumber').value;
      const tPlayer = await this.playerService.GetPlayerByMobileNumber(tMobileNumber);
      if (tPlayer && tPlayer.ID > 0) {
        this.fileName = tPlayer.Name + "_wiver_document";
        this.filePath = Constants.BaseServerUrl + tPlayer.Document;
        this.isPlayerFound = true;
        this.ticketForm.controls['sessionTime'].enable();
        this.ticketForm.controls['levelOfPlayer'].enable();
        this.ticketForm.controls['gameType'].enable();
        this.playerId = tPlayer.ID;
        this.playerName = tPlayer.Name;
        this.playerAge = tPlayer.Age.toString();
        this.nationality = this.nationalities.find((item) => item.ID == tPlayer.NationalityId).Name;
        this.passportsNo = tPlayer.PassportsNo;
        this.membershipExpiry = new Date(tPlayer.MembershipExpiry).toLocaleDateString();
        this.membershipNo = tPlayer.MembershipNo;
        this.image = tPlayer.Photo ? Constants.BaseServerUrl + tPlayer.Photo : null;
        this.document = tPlayer.Document;
      } else {
        this.isPlayerFound = false;
        this.ticketForm.controls['sessionTime'].disable();
        this.ticketForm.controls['levelOfPlayer'].disable();
        this.ticketForm.controls['gameType'].disable();

        this.playerId = -1;
        this.playerName = '';
        this.playerAge = '';
        this.nationality = '';
        this.passportsNo = '';
        this.membershipExpiry = '';
        this.membershipNo = '';
        this.image = '';
        this.openAlertDialog('No Player Found, Please Add Player First');
      }
    } catch (error) {
      console.log(error);
    }
  }


  public async download() {
    if (this.isPlayerFound) {
      (await this.ticketService.DownloadFile(this.document))
        .pipe(
          timeout(100000),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe((response) => {
          this.saveFile(response);
        })
    }
  }

  private getExtensionFromContentType(contentType: string): string {
    switch (contentType) {
      case 'application/pdf':
        return '.pdf';
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.png';
      // Add more cases as needed for other content types
      default:
        return '';
    }
  }

  private saveFile(blob: Blob) {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    const contentType = blob.type;
    const extension = this.getExtensionFromContentType(contentType);
    a.href = objectUrl;
    a.download = this.fileName + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
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
