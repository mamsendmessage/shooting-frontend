import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/Player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})
export class CreateTicketModalComponent implements OnInit {
  public ticketForm: FormGroup;
  public imageBase64: string = '';
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreateTicketModalComponent>, private playerService: PlayerService) {
    this.ticketForm = this.fb.group({
      nameOfPlayer: ['', Validators.required],
      nationality: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      age: ['', Validators.required],
      gameType: ['', Validators.required],
      levelOfPlayer: ['', Validators.required],
      sessionTime: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadScript("assets/js/camera.js");
  }

  public close() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.ticketForm.valid) {
      console.log('Form submitted with values:', this.ticketForm.value);
      const tPlayer: Player = new Player(null);
      tPlayer.Age = this.ticketForm.value.age;
      tPlayer.MobileNumber = this.ticketForm.value.mobileNumber;
      tPlayer.Name = this.ticketForm.value.nameOfPlayer;
      tPlayer.NationalityId = 1;
      tPlayer.Photo = this.ticketForm.value.photo;
      this.playerService.AddPlayer(tPlayer);
      // Perform ticket creation logic or API call here
    } else {
      console.log('Form is invalid');
    }
  }

  public loadScript(url) {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') == url) {
        document.getElementsByTagName('head')[0].removeChild(scripts[i]);
        isFound = true;
      }
    }

    if (!isFound) {

      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
