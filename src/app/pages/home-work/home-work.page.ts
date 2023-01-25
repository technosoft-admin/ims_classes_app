import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
})
export class HomeWorkPage implements OnInit {

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
  model: any = {}
  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.model = { search: null};
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.sms = false;
    this.app = true;
    this.selectall = false
    this.getHomeWorkData(0)

  }

  ionViewWillEnter() {
    this.model = { search: null};
    this.selectall = false
    this.sms = false;
    this.app = true;
    this.tab = 0;
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.getHomeWorkData(0);
  }
  onPublish(id) {
    this.getPublishSubscribe = this.http.get('published/' + id).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          this.commonUtils.presentToast('success', res.return_message);
          this.getHomeWorkData(0)
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  onEdit(id) {
    this.router.navigateByUrl('/home-work-student-list/' + id)
  }
  onClick(check) {
    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      searchInput.value = '';
   });
    console.log('onClick');
    console.log('onClick Data....', check);
    this.model = { search: '' };
      console.log('onClick',this.model)
    this.selectall = false;
    this.tab = check;
    this.getHomeWorkData(check)
  }

  getHomeWorkData(id) {

    console.log('this.model',this.model);

    this.homework_list_url = 'homeworklist?id=' + id;
    this.homeworkListSubscribe = this.http.get(this.homework_list_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          console.log('getHomeWorkData', res.return_data.homework_data);
          this.list = res.return_data.homework_data;
          this.listData = res.return_data.homework_data;
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
