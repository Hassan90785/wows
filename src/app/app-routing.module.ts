import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PlayerDetailsComponent} from './player-details/player-details.component';


const routes: Routes = [
  { path: '', component:  HomeComponent},
  {path: 'detail/:id', component: PlayerDetailsComponent, pathMatch: 'full'}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
