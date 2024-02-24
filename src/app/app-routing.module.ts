import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ReciptionComponent } from './components/reciption/reciption.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LaneComponent } from './components/lane/lane.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { PermissionGuard } from './gaurds/permission.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'reciption', component: ReciptionComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'admin', component: AdminConsoleComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, PermissionGuard] },
  { path: 'lane/:id', component: LaneComponent },


  // Add other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
