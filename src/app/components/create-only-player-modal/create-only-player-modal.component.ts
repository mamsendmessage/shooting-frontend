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
import { SessionsTime } from 'src/app/models/SessionsTime';
import { PlayerLevel } from 'src/app/models/PlayerLevel';
import { PlayerService } from 'src/app/services/player.service';
@Component({
  selector: 'app-create-only-player-modal',
  templateUrl: './create-only-player-modal.component.html',
  styleUrls: ['./create-only-player-modal.component.css']
})
export class CreateOnlyPlayerModalComponent implements OnInit {

  public playerForm: FormGroup;
  public webcamImage: WebcamImage = null;
  public image: string = '';
  public laneId: number = -1;
  public fileName: string = 'No file selected';
  public nationalities: Nationality[] = [];
  public SessionsTime: SessionsTime[] = [];
  public PlayerLevels: PlayerLevel[] = [];


  public isFormSubmitted: boolean = false;
  public isReady: boolean = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateOnlyPlayerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pPlayer: Player, private playerService: PlayerService, private configService: ConfigurationService, public dialog: MatDialog) {

    if (pPlayer && pPlayer.ID > 0) {
      this.fileName = pPlayer.Document;
      this.image = pPlayer.Photo ? Constants.BaseServerUrl + pPlayer.Photo.replace('images', '') : null;
      this.playerForm = this.fb.group({
        nameOfPlayer: [pPlayer.Name, Validators.required],
        nationality: [pPlayer.NationalityId, Validators.required],
        mobileNumber: [pPlayer.MobileNumber ? pPlayer.MobileNumber : '', Validators.required],
        age: [pPlayer.Age, Validators.required],
        photo: [''],
        document: [''],
        passportsNo: [pPlayer.PassportsNo, Validators.required],
        membershipNo: [pPlayer.MembershipNo, Validators.required],
        membershipExpiry: [new Date(pPlayer.MembershipExpiry).toISOString().split('T')[0], Validators.required]
      });
    } else {
      this.playerForm = this.fb.group({
        nameOfPlayer: ['', Validators.required],
        nationality: ['', Validators.required],
        mobileNumber: [pPlayer.MobileNumber ? pPlayer.MobileNumber : '', Validators.required],
        age: ['', Validators.required],
        photo: [''],
        document: [''],
        passportsNo: ['', Validators.required],
        membershipNo: ['', Validators.required],
        membershipExpiry: ['', Validators.required]
      });
    }
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
    if (this.playerForm.valid) {
      const tPlayer: Player = new Player(null);
      tPlayer.Age = this.playerForm.value.age;
      tPlayer.MobileNumber = this.playerForm.value.mobileNumber;
      tPlayer.Name = this.playerForm.value.nameOfPlayer;
      tPlayer.NationalityId = this.playerForm.value.nationality;
      tPlayer.Photo = this.webcamImage ? this.webcamImage.imageAsBase64 : '';
      tPlayer.Document = this.playerForm.value.document ? this.playerForm.value.document : '';
      tPlayer.PassportsNo = this.playerForm.value.passportsNo;
      tPlayer.MembershipNo = this.playerForm.value.membershipNo;
      tPlayer.MembershipExpiry = this.playerForm.value.membershipExpiry;
      const tResult: number = await this.playerService.AddPlayer(tPlayer);
      if (tResult == 0) {
        this.close();
      } else if (tResult == -2){
        this.openAlertDialog('The Player Is Already Exist, Please Check with the Adminstriator');
      } else {
        this.openAlertDialog('An Error Occured While Performing Your Request, Please Check with the Adminstriator');
      }
    } else {
      this.isFormSubmitted = true;
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.playerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.playerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError] + " -> " + this.playerForm.get(key).value);
        });
      }
    });
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.image = webcamImage.imageAsDataUrl;
    this.playerForm.value.photo = webcamImage.imageAsBase64;
  }

  onSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName = file.name;
    this.playerForm.patchValue({ document: file });
    this.playerForm.get('document').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.playerForm.value.document = reader.result;
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }

  public isAttributeIsNotValid(pName) {
    if (this.isFormSubmitted && !this.playerForm.get(pName).valid) {
      return true;
    }
    if (this.playerForm.get(pName).touched || this.playerForm.get(pName).dirty) {
      return !this.playerForm.get(pName).valid;
    } else {
      return false;
    }
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