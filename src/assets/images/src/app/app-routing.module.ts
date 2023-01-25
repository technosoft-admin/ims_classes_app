import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
    
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'create-password',
    loadChildren: () => import('./pages/create-password/create-password.module').then( m => m.CreatePasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'resend-otp',
    loadChildren: () => import('./pages/resend-otp/resend-otp.module').then( m => m.ResendOtpPageModule)
  },
  {
    path: 'otp-verification',
    loadChildren: () => import('./pages/otp-verification/otp-verification.module').then( m => m.OtpVerificationPageModule)
  },
  {
    path: 'otp-counter',
    loadChildren: () => import('./pages/otp-counter/otp-counter.module').then( m => m.OtpCounterPageModule)
  },
  {
    path: 'password-confirmation',
    loadChildren: () => import('./pages/password-confirmation/password-confirmation.module').then( m => m.PasswordConfirmationPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'attendance-list',
    loadChildren: () => import('./pages/attendance-list/attendance-list.module').then( m => m.AttendanceListPageModule)
  },
  {
    path: 'library-list',
    loadChildren: () => import('./pages/library-list/library-list.module').then( m => m.LibraryListPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
