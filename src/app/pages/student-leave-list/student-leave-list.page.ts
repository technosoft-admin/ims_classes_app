import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-student-leave-list',
  templateUrl: './student-leave-list.page.html',
  styleUrls: ['./student-leave-list.page.scss'],
})
export class StudentLeaveListPage implements OnInit {

  approved = true;
  rejected = false;
  list: any;
  private leaveListSubscribe: Subscription;

 leave_list_url: string;
  file_url = environment.fileUrl;
  divisionlist: any;
  range: any;
  listData: any;
  sms: boolean;
  app: boolean;
  type: string;
  selectall: boolean;
  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.getLeaveData()
  }
  
  ionViewWillEnter() {
    this.getLeaveData()
   

  }
  onClick(check) {
  
  }
  getLeaveData() {
    this.selectall=false;

    this.leave_list_url = 'leaveList';
    this.leaveListSubscribe = this.http.get(this.leave_list_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          console.log('getHomeWorkData', res.return_data);
          this.list = res.return_data;
          this.listData=res.return_data;
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  
  onSubmit() {

    this.router.navigateByUrl('/student-leave-add/0')
  }
  onEdit(id)
  {
    this.router.navigateByUrl('/student-leave-add/'+id)
  
  
  }
  search(query) {
    this.list = this.listData.filter(book => book.from_date.indexOf(query) > -1 || book.to_date.indexOf(query) > -1 || book.subject_name.toLowerCase().indexOf(query.toLowerCase()) > -1 )
  }


  ngOnDestory() {
    if (this.leaveListSubscribe !== undefined) {
      this.leaveListSubscribe.unsubscribe();
    }
  }
}
