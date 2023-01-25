import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  tab: any;
  dashboard_btn: any;
  gallery_btn: any;
  account_btn: any;
  Clicked: boolean;
  centered = false;
  radius: number;
  color: string;
  private logoutApi: Subscription;

  constructor(private authService: AuthLoginService,private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.logoutApi = this.http.get('logout').subscribe(
      (res: any) => {
        if (res.return_status == 1) {
             this.authService.logout();

        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );

    // this.router.navigateByUrl('/auth');

  }
  onClick(check) {
    //    console.log(check);
    if (check == 1) {
      this.tab = 'dashboard_btn';
      console.log('dashboard>>', this.tab);

    } else if (check == 2) {
      this.tab = 'gallery_btn';
      console.log('gallery>>', this.tab);
    } else {
      this.tab = 'account_btn';
      console.log('account>>', this.tab);
    }

  }
  ngOnDestroy() {
    if (this.logoutApi !== undefined) {
      this.logoutApi.unsubscribe();
    }
  }
}
