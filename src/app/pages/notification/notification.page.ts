import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import {trigger, state, transition, animate, style, query, animateChild, group} from '@angular/animations'
import { DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  animations: [
    trigger('clearExpand', [
      transition(':enter', [
        style({width: '0', opacity: 0}),
        group([
          animate(200, style({width: '*'})),
          animate('100ms 100ms', style({opacity:'{{finalOpacity}}'}))
        ])
      ], {params: {finalOpacity: 1}}),
      transition(':leave', [
        group([
          animate(200, style({width: '0px'})),
          animate('100ms', style({opacity:0}))
        ])
      ]),
      // TODO: opacity is not good enough. When hidden, button should also be disabled and aria-hidden (or removed completely)
      state('1', style({opacity: '*'})),
      state('0', style({opacity: '0'})),
      transition('1<=>0', animate(200)),
    ]),
    trigger('searchExpand', [
      state('1', style({width: '*', backgroundColor: '*', margin: '*'})),
      state('0', style({width: '100%', backgroundColor: '#fff', color: 'white', margin: '0', display: 'flex'})),
      transition('0=>1', [
        group([
          style({width: '60px', backgroundColor: '#fff'}),
          animate(200, style({width: '*', backgroundColor: '*', color: '*'})),
          query('@inputExpand', [
            style({width: '100%'}),
            animate(200, style({
              width: '*',
              margin: '*',
            })),
          ]),
          query('@clearExpand', [
            animateChild(),
          ])
        ])
      ]),
      transition('1=>0', [
        group([
          style({width: '*'}),
          animate(200, style({
            backgroundColor: 'transparent',
            width: '40px',
            color: 'white',
          })),
          query('@clearExpand', [
            animateChild(),
          ]),
          query('@inputExpand', [
            animate(200, style({
              width: '0',
              backgroundColor: 'transparent',
              opacity: '0',
              margin: '0',
            }))
          ]),
        ])
      ]),
    ]),
    trigger('inputExpand', [
      state('0', style({width: '100%', margin: '0'})),
      // Without this transition, the input animates to an incorrect width
      transition('0=>1', []),
    ]),
  ],
})
export class NotificationPage implements OnInit {
  
  showSearch:boolean = false;
  noKeyword:boolean = false;
  @ViewChild(DefaultValueAccessor)
  inputModel: DefaultValueAccessor;

  _value = '';
  _onChangesFn?: (any)=>null = undefined

  expanded = false;

  tab: any;
  all: any;
  general: any;
  attendance: any;
  libary: any;
  list: any[];
  color_set:string;
  categoryListUrl: any;
  load = false;
  categoryList: any;
  notificationListUrl: string;
  notificationList: any;
  tabname: any;
  model:any={};
  currentDate: any;
  footerHidden: boolean;
  searchopen: string;
  pageCount: any;
  dataLentch: number;
  private formSubmitSubscribe: Subscription;
  private getCategorySubscribe: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient, private sanitized: DomSanitizer) { }

  ngOnInit() {
    this.onLoader();
    this.searchopen='0'
    // this.ionViewWillEnter();
    this.color_set='#ff3030';

    let today = new Date();
    this.currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    console.log('date   ', this.currentDate)

    this.tabname = 'all';
  }
  searchOpen()
  {
   console.log(this.searchopen);
   
    if(this.searchopen==='0')
    {
      this.searchopen='1';
    }
    else
    {
      this.searchopen='0';
    }
  }
  onLoader() {
    this.tabname = 'all';
    this.color_set='#ff3030';

    this.load = true;
    this.pageCount = 2;

    console.log('this.load1', this.load);
    setTimeout(() => {
      this.load = false;
    }, 1000);
    this.categoryListUrl = "notification-category";
    this.getcategory()
    this.notificationListUrl = "notification";
    this.getNotification(10,'')
    console.log('this.load2', this.load);

  }

  loadMoreData(event) {
    this.getNotification(this.pageCount * 10,'')
    if (this.pageCount * 10 > this.dataLentch) {
    }
    this.pageCount++;
    event.target.complete();
  };

  getcategory() {
    this.getCategorySubscribe = this.http.get(this.categoryListUrl).subscribe(
      (response: any) => {
        console.log(response);
        if (response.return_status == 1) {
          this.categoryList = response.return_data.category;
          console.log('categoryList.........', this.categoryList);
        }
      },
      errRes => {

      }
    );
  }

  getNotification(pageNumber,search) {
    this.formSubmitSubscribe = this.http.get(this.notificationListUrl + '?page=' + pageNumber + '&type=' + this.tabname + '&search='+search).subscribe(
      (response: any) => {
        console.log(response);
        this.list = []
        if (response.return_status == 1) {
          this.notificationList = response.return_data.notification.rows;
          this.dataLentch = response.return_data.notification.count
          console.log(this.tabname);
          if (this.tabname == 'all') {
            this.list = this.notificationList;
          }
          else {
            this.list = this.notificationList.filter(book => book.notification_category === this.tabname.toString())
          }
          console.log('notificationList.........', this.list);
        }
      },
      errRes => {
      }
    );
  }
  ionViewWillEnter() {
    this.onLoader()
    this.tab = 'all';
  }
  onClick(tabname,color) {
  this.color_set=color;

    this.tabname = tabname;
    // if(this.tabname==="all")
    this.tab = tabname
    console.log(this.tabname);
    this.getNotification(10,'')
    if (tabname == 'all') {
      this.color_set='#ff3030';
      this.list = this.notificationList;
    }
    else {
      this.list = this.notificationList.filter(book => book.notification_category === tabname.toString())
    }
    console.log('filterdata', this.list);
  }
  gotoNextPage(id) {
    this.router.navigateByUrl('/notification-list/' + id)
  }
  search(search)
  {
    console.log(search)
    this.getNotification('',search)
  }

  //Search Start.....

  registerOnChange(fn: any) {
    this._onChangesFn = fn;
    this.inputModel.registerOnChange(fn)
  }

  registerOnTouched(fn: any) {
    this.inputModel.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.inputModel.setDisabledState(isDisabled);
  }

  writeValue(obj: any) {
    this._value = obj;
    this.inputModel.writeValue(obj);
  }

  close() {
    this._value = '';
  }

  onSearchClicked() {
    if(!this.expanded) {
      this.expanded = true;
    } else {
      console.log('search')
    }
  }

  onBlur() {
    if(!(this._value && this._value.length>0)){
      this.expanded = false;
    }
  }
  //Search End....
  ngOnDestory() {
    if (this.formSubmitSubscribe !== undefined) {
      this.formSubmitSubscribe.unsubscribe();
    }
    if (this.getCategorySubscribe !== undefined) {
      this.getCategorySubscribe.unsubscribe();
    }
  }
}
