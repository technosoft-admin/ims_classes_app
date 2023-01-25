import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-home-work-list',
  templateUrl: './home-work-list.page.html',
  styleUrls: ['./home-work-list.page.scss'],
})
export class HomeWorkListPage implements OnInit {

  
  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  private homeworkListSubscribe: Subscription;
  private getPublishSubscribe: Subscription;
  homework_list_url: string;
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
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.sms = false;
    this.app = true;
    this.selectall=false
    this.getHomeWorkData('current')
    
  }
  
  ionViewWillEnter() {
    this.selectall=false
    this.tab = 0;
    this.getHomeWorkData('current')
   

  }
  onClick(check) {
    console.log(this.selectall);
    
    this.selectall=false;
    console.log(this.selectall);

    this.tab = check;
    let type='current';
    if(check==0)
    {
      type="current"
    }
    if(check==1)
    {
      type="complete"
    }
    this.getHomeWorkData(type)
  }
  getHomeWorkData(id) {
    this.selectall=false;

    this.homework_list_url = 'homworkList?type='+id;
    this.homeworkListSubscribe = this.http.get(this.homework_list_url).subscribe(
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

    this.router.navigateByUrl('/home-work-student-list/0')

  }

  search(query) {
    this.list = this.listData.filter(book => book.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
  }


  ngOnDestory() {
    if (this.homeworkListSubscribe !== undefined) {
      this.homeworkListSubscribe.unsubscribe();
    }
    if (this.getPublishSubscribe !== undefined) {
      this.getPublishSubscribe.unsubscribe();
    }
  }

}
