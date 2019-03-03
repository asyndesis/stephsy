import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_services';
const routes: Routes = [
  /*
  {
    path: 'signup', component: UserComponent,
    children: [{
      path: '', component: SignUpComponent
    }]
  },
  */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './_components/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './_components/login/login.module#LoginPageModule' },
  {
    path: 'dashboard',
    loadChildren: './_components/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuardService],
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
