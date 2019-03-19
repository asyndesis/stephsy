import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    data:{title:'Dashboard'}
  },
  {
    path: 'profile',
    component: ProfilePage,
    data:{title:'Profile'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, ProfilePage]
})
export class DashboardPageModule {}
