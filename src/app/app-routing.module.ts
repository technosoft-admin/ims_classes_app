import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'create-password/:id',
    loadChildren: () => import('./pages/create-password/create-password.module').then( m => m.CreatePasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password/:id',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  
  {
    path: 'password/:id',
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
    path: 'otp-counter/:action/:id',
    loadChildren: () => import('./pages/otp-counter/otp-counter.module').then( m => m.OtpCounterPageModule)
  },
  {
    path: 'password-confirmation/:id',
    loadChildren: () => import('./pages/password-confirmation/password-confirmation.module').then( m => m.PasswordConfirmationPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'attendance',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'attendance-list',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/attendance-list/attendance-list.module').then( m => m.AttendanceListPageModule)
  },
  {
    path: 'library-list',
    loadChildren: () => import('./pages/library-list/library-list.module').then( m => m.LibraryListPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'login-success/:id',
    loadChildren: () => import('./pages/login-success/login-success.module').then( m => m.LoginSuccessPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'attendance-notification',
    loadChildren: () => import('./pages/attendance-notification/attendance-notification.module').then( m => m.AttendanceNotificationPageModule)
  },
  {
    path: 'library-notification',
    loadChildren: () => import('./pages/library-notification/library-notification.module').then( m => m.LibraryNotificationPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'result-status',
    loadChildren: () => import('./pages/result-status/result-status.module').then( m => m.ResultStatusPageModule)
  },
  {
    path: 'notification-list/:id',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/notification-list/notification-list.module').then( m => m.NotificationListPageModule)
  },
  {
    path: 'feedback-page',
    loadChildren: () => import('./pages/feedback-page/feedback-page.module').then( m => m.FeedbackPagePageModule)
  },
  {
    path: 'feedback-details',
    loadChildren: () => import('./pages/feedback-details/feedback-details.module').then( m => m.FeedbackDetailsPageModule)
  },
  {
    path: 'feedback-view',
    loadChildren: () => import('./pages/feedback-view/feedback-view.module').then( m => m.FeedbackViewPageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./pages/download/download.module').then( m => m.DownloadPageModule)
  },
  {
    path: 'fees',
    loadChildren: () => import('./pages/fees/fees.module').then( m => m.FeesPageModule)
  },
  {
    path: 'fees-payment',
    loadChildren: () => import('./pages/fees-payment/fees-payment.module').then( m => m.FeesPaymentPageModule)
  },
  {
    path: 'transaction-details',
    loadChildren: () => import('./pages/transaction-details/transaction-details.module').then( m => m.TransactionDetailsPageModule)
  },
  {
    path: 'account',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  // {
  //   path: '**',   // redirects all other routes to the main page
  //   redirectTo: 'dashboard'
  // },
  {
    path: 'notification-save',
    canLoad:[AuthGuard],
    loadChildren: () => import('./teacher/notification-save/notification-save.module').then( m => m.NotificationSavePageModule)
  },
  {
    path: 'notification-message',
    canLoad:[AuthGuard],
    loadChildren: () => import('./teacher/notification-message/notification-message.module').then( m => m.NotificationMessagePageModule)
  },
  {
    path: 'student-list/:type',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'student-attendance',
    canLoad:[AuthGuard],
    loadChildren: () => import('./teacher/student-attendance/student-attendance.module').then( m => m.StudentAttendancePageModule)
  },
  {
    path: 'home-work',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/home-work/home-work.module').then( m => m.HomeWorkPageModule)
  },
  {
    path: 'home-work-add/:id',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/home-work-add/home-work-add.module').then( m => m.HomeWorkAddPageModule)
  },
  {
    path: 'home-work-student-list/:id',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/home-work-student-list/home-work-student-list.module').then( m => m.HomeWorkStudentListPageModule)
  },
  {
    path: 'student-home-work/:id',
    loadChildren: () => import('./pages/student-home-work/student-home-work.module').then( m => m.StudentHomeWorkPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'home-work-list',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/home-work-list/home-work-list.module').then( m => m.HomeWorkListPageModule)
  },
  {
    path: 'student-leave-list',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/student-leave-list/student-leave-list.module').then( m => m.StudentLeaveListPageModule)
  },
  {
    path: 'student-leave-add/:id',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/student-leave-add/student-leave-add.module').then( m => m.StudentLeaveAddPageModule)
  },
  {
    path: 'announcement',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/announcement/announcement.module').then( m => m.AnnouncementPageModule)
  },
  {
    path: 'exam-list',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/exam-list/exam-list.module').then( m => m.ExamListPageModule)
  },
  {
    path: 'exam-subject-list/:exam/:div',
    canLoad:[AuthGuard],

    loadChildren: () => import('./pages/exam-subject-list/exam-subject-list.module').then( m => m.ExamSubjectListPageModule)
  },
  {
    path: 'exam-student-list/:div',
    canLoad:[AuthGuard],

    loadChildren: () => import('./pages/exam-student-list/exam-student-list.module').then( m => m.ExamStudentListPageModule)
  },
  {
    path: 'student-exam-result/:exam_id',
    canLoad:[AuthGuard],

    loadChildren: () => import('./pages/student-exam-result/student-exam-result.module').then( m => m.StudentExamResultPageModule)
  },
  {
    path: 'result-preparation',
    loadChildren: () => import('./pages/result-preparation/result-preparation.module').then( m => m.ResultPreparationPageModule)
  },
  {
    path: 'result-download',
    loadChildren: () => import('./pages/result-download/result-download.module').then( m => m.ResultDownloadPageModule)
  },


















];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
