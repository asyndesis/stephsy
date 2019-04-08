import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards';
const routes: Routes = [
  // Child routes are located in _components/*
  // ToDo: might want to rename them to pages folders, but we will see.
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data:{title: 'Login', level:1}},
  { path: 'register',
    loadChildren: './_components/register/register.module#RegisterPageModule',
    data:{title: 'Register', level:1}},
  { path: 'login',
    loadChildren: './_components/login/login.module#LoginPageModule',
    data:{title: 'Login', level:1}},
  { path: 'dashboard',
    loadChildren: './_components/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuard],
    data:{title: 'Dashboard', level:1}},
  { path: 'test', loadChildren: './_components/test/test.module#TestPageModule',
    data:{title: 'Test Area', level:1}
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
