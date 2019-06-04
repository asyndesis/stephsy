import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { UsersPage } from './users/users.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    data:{title:'Admin', level:2}
  },
  {
    path: 'users',
    component: UsersPage,
    data:{title:'Users', level:2}
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage, UsersPage]
})
export class AdminPageModule {}
