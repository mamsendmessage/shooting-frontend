import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  breadcrumb: string[];
  constructor(private router: Router, private userManagementService: UserManagementService,private breadcrumbService: BreadcrumbService) { }


  ngOnInit(): void {
    this.breadcrumbService.getBreadcrumb().subscribe(breadcrumb => {
      this.breadcrumb = breadcrumb;
    });
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
