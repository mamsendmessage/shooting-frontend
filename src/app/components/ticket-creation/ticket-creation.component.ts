// ticket-creation.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      userProfile: this.fb.group({
        name: ['', Validators.required],
        nationality: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        age: ['', [Validators.required, Validators.min(1)]]
      }),
      ticketDetails: this.fb.group({
        gameType: ['', Validators.required],
        playerLevel: ['', Validators.required],
        sessionTime: ['', Validators.required]
      }),
      shootingAreaNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.ticketForm.value);
  }
}
