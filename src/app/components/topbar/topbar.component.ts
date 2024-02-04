import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router, private userManagementService: UserManagementService) { }


  ngOnInit(): void {
  }

  public navigate(pPath: string) {
    this.router.navigate([pPath])
      .then(() => {
        window.location.reload();
      });
  }

  public LogOut() {
    this.userManagementService.removeUser();
    this.router.navigate(['/login']);
  }
}
