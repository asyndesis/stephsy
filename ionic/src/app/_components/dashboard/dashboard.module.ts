import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
import { ProfilePage } from './profile/profile.page';
import { ChatPage } from './chat/chat.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    data:{title:'Dashboard', level:1}
  },
  {
    path: 'profile',
    component: ProfilePage,
    data:{title:'Profile', level:2}
  },
  {
    path: 'chat',
    component: ChatPage,
    data:{title:'Chat', level:2}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, ProfilePage, ChatPage]
})
export class DashboardPageModule {}
