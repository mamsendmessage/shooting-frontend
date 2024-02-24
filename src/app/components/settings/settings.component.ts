import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/Configuration';
import { Skeet } from 'src/app/models/Skeet';
import { SkeetConfig } from 'src/app/models/SkeetConfig';
import { ConfigurationService } from 'src/app/services/config.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CreateLevelDialogComponent } from '../create-level-dialog/create-level-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public normalConfigs: Configuration[] = [];

  public beginnersConfig: Configuration = new Configuration();
  public intermidateConfig: Configuration = new Configuration();
  public profissionalConfig: Configuration = new Configuration();
  public competitionConfig: Configuration = new Configuration();
  public isReady: boolean = false;
  constructor(private configService: ConfigurationService, private breadcrumbService: BreadcrumbService, public dialog: MatDialog) { }
  async ngOnInit(): Promise<void> {
    this.breadcrumbService.setBreadcrumb(['Application', 'Settings']);

    this.normalConfigs = await this.configService.GetAllConfig();
    this.competitionConfig = this.normalConfigs.find((item) => item.Type == null);
    this.normalConfigs = this.normalConfigs.filter((item) => item.Type != null);
    this.isReady = true;
  }

  public addLevelDynamic() {
    this.openCreateUserDialog();
  }


  public openCreateUserDialog(): void {

    let dialogRef;
    dialogRef = this.dialog.open(CreateLevelDialogComponent, {

    });
    // You can subscribe to the afterClosed() event to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }



}
