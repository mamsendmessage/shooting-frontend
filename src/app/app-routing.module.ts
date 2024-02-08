import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ReciptionComponent } from './components/reciption/reciption.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './auth.guard';
import { LaneComponent } from './components/lane/lane.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'reciption', component: ReciptionComponent},
  { path: 'tickets', component: TicketsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'lane/:id', component: LaneComponent },

  // Add other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
