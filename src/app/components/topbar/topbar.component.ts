import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(pPath: string) {
    this.router.navigate([pPath])
      .then(() => {
        window.location.reload();
      });
  }

}
