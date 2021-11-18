import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'attendence',
    loadChildren: () => import('./attendence/attendence.module').then( m => m.AttendencePageModule)
  },
  {
    path: 'attendence-single',
    loadChildren: () => import('./attendence-single/attendence-single.module').then( m => m.AttendenceSinglePageModule)
  },
  {
    path: 'attendence-single-edit',
    loadChildren: () => import('./attendence-single-edit/attendence-single-edit.module').then( m => m.AttendenceSingleEditPageModule)
  },
  {
    path: 'attendence-expense',
    loadChildren: () => import('./attendence-expense/attendence-expense.module').then( m => m.AttendenceExpensePageModule)
  },
  {
    path: 'attendence-expense-edit',
    loadChildren: () => import('./attendence-expense-edit/attendence-expense-edit.module').then( m => m.AttendenceExpenseEditPageModule)
  },
  {
    path: 'attendence-expense-add',
    loadChildren: () => import('./attendence-expense-add/attendence-expense-add.module').then( m => m.AttendenceExpenseAddPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
