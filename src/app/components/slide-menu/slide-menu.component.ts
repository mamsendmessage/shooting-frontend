import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent implements OnInit {

  @Input() public currentTab: string = 'Home';
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
