import { Component, Renderer2, Inject, OnInit, ViewChildren } from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser'; //use for fabicon
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Subscription, observable } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthLoginService } from './services/auth/auth.service';
import { CommonUtils } from './services/common-utils/common-utils';

import { environment } from '../environments/environment';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { take } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { timer } from 'rxjs';
/* tslint:disable */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  @ViewChildren(IonRouterOutlet) routerOutlets;
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;

  //
  showSplash=false
  // variable define
  url_name;
  url_path_name;
  get_user_type;
  panelOpenState: boolean;
  userInfodDataLoading;
  private userInfoSubscribe: Subscription;
  private groupMenuDataSubscribe: Subscription;
  private versionSubscribe: Subscription;
  private AppConfigSubscribe: Subscription;
  menuPages = [];
  menuPagesList;
  menuPages2 = [];
  activeMenuHilight;
  selectedItemActive;
  parentSelectedIndex;
  childSelectedIndex;
  siteInfo: any;
  hourglass:boolean = true
  isActive: boolean = false;
  siteInfoLoading;
  checkAuthentication;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthLoginService,
    public menuCtrl: MenuController,
    public renderer: Renderer2,
    public router: Router,
    private commonUtils: CommonUtils,
    private alertController: AlertController,
    private storage: Storage,
    private firebaseX: FirebaseX,
    private nativeStorage: NativeStorage,
    private file: File// common functionlity come here
    // @Inject(DOCUMENT) private _document: HTMLDocument //use for fabicon
  ) {
    console.log("<-------------------------------------------->")
    // this.onSiteInformation();
    this.hourglass = true
    setTimeout(() => {
      this.appConfigCall();
    },1000);

    this.backButtonEvent();
   
    // this.appConfigCall();


    /* this.commonUtils.menuDataobservable.subscribe(menuData =>{
      menuData.forEach(element => {
        element.pages.forEach(element2 => {
       console.log('menu data gurd >>>>>>>>>>>>>>>>>>>>>>>>> element2', element2.type.split('/')[1]);
      this.commonUtils.pagePathNameAnywhereObsv.subscribe(pathRes => {
        // console.log(' url name #### >>', pathRes);
        if(element2.type.split('/')[1] == pathRes){
           console.log('founddddddddddddddddddddddddddddddddddddddddddddddddd');
          //return of(!!isAuthenticated); //(!!) means true or false (boolean value)
        }else{
          console.log('not tt  founddddddddddddddddddddddddddddddddddddddddddddddddd');
          //return of(!!isAuthenticated); //(!!) means true or false (boolean value)
          this.router.navigateByUrl('/auth');
        }
      }); 
        });
      });
    }); */

    /* this.commonUtils.menuDataobservable.subscribe(menuData =>{
      console.log('menu data gurd aa >>>>>>>>>>>>>>>>>>>>>>>>> element2', menuData);
    }); */


  }






  ionViewWillEnter() {

    
    this.versionChek();
  }
  ngOnInit(): void {


    this.versionChek();
  
    // let data=localStorage.getItem('image')

    // console.log("store Data----->", data)


    this.firebaseX.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.log('Error getting token', error));
    this.firebaseX.onMessageReceived()
      .subscribe(data =>

        // console.log('User opened a notification',data)
        this.router.navigateByUrl('notification-list/' + data.id)

        // .subscribe(data => console.log(`User opened a notification ${data}`)
      );


    this.firebaseX.onTokenRefresh()
      .subscribe((token: string) =>
        localStorage.setItem('deviceToken', token)
        // console.log(`Got a new token ${token}`)
      );
    // throw new Error('Method not implemented.');


  }

  versionChek() {

    this.versionSubscribe = this.http.get('version').subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          // alert(res.return_date)
          console.log('id', res.return_date)
          if (res.return_data.version !== '0.0.1') {
            this.versionAlertConfirm(res.return_data);

          }
        }
      }
    );
  }

  setImageColor(response) {
    let color_data = response.color;
    let image_data = response.image;
    console.log(response)
    document.documentElement.style.setProperty('--dynamic-app-image-background', 'url(' + image_data?.background_img + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-logo', 'url(' + image_data?.app_logo_img + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-otp', 'url(' + image_data?.otp_img + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-reset-password', 'url(' + image_data?.reset_password_image + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-forget-password', 'url(' + image_data?.forget_password_image + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-splash', 'url(' + image_data?.splash_img + ')');
    document.documentElement.style.setProperty('--dynamic-app-image-success', 'url(' + image_data?.success_image + ')');
    
    document.documentElement.style.setProperty('--dynamic-primary-front-color', color_data?.pri_front_color);
    document.documentElement.style.setProperty('--dynamic-primary-background-color', color_data?.pri_background_color);
    document.documentElement.style.setProperty('--dynamic-second-front-color', color_data?.sec_front_color);
    document.documentElement.style.setProperty('--dynamic-second-background-color', color_data?.sec_background_color);
    document.documentElement.style.setProperty('--dynamic-default-dark-text-color', color_data?.default_dark_text_color);
    document.documentElement.style.setProperty('--dynamic-light-dark-text-color', color_data?.default_light_text_color);
    document.documentElement.style.setProperty('--dynamic-app-background-color', color_data?.app_background_color);

    ////////////////////Image//////////
    this.hourglass= false
    this.showSplash=true;
    
    this.initializeApp();



  }

  appConfigCall() {
    // this.nativeStorage.ready().then(() => {?
    // this.nativeStorage.getItem('image').then(
    //   data => console.log("appConfigCall----------------->",data),
    //   error => this.appConfig(),
    // );
    // let StoredData= this.nativeStorage.getItem('image')
    // if(this.nativeStorage.getItem('image'))
    // {

    // }
    console.log('nativeStorage->>>',this.nativeStorage.getItem('image'))
    this.nativeStorage.getItem('image').then(
      data =>this.setImageColor(JSON.parse(data)),
      error => this.appConfig(),
    );
  // }
  }


  appConfig() {
    console.log("getiiing data................")
    this.AppConfigSubscribe = this.http.get('app_config').subscribe(
      async (response: any) => {
        let array = []
        console.log("print Data..................",response.return_data.image)
        this.nativeStorage.setItem('image', JSON.stringify(response.return_data)).then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item.............', error)
        );
        this.setImageColor(response.return_data)
        this.hourglass=false;
        // this.appConfigCall();

      },
      errRes => {

      }
    );
  }

  // Backbutton call
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        // alert('this.router >'+ this.router);
        // alert('this.router.url >'+ this.router.url);
        if (this.router.url === '/auth' || this.router.url === '/dashboard') {
          // navigator['app'].exitApp();
          this.presentAlertConfirm();
        } else {
          window.history.back();
        }
      });
    });
  }

  // alert call
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      cssClass: 'custom-alert2',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancelBtn',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }
  async versionAlertConfirm(data) {
    const alert = await this.alertController.create({
      header: 'Update Available',
      message: 'A new version of ' + data.name + ' is available. Please update to version ' + data.version + ' now.',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Update',
          handler: () => {
            navigator['app'].exitApp();
            window.open(data.url);
            // window.open("https://play.google.com/store/apps/details?id=your-app-package-name&hl=en","_system");
          }
        }
      ]
    });

    await alert.present();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // this.statusBar.overlaysWebView(true);
      // if (this.platform.is('android')) {
      //   // this.statusBar.backgroundColorByHexString("#ffffff");
      //   this.statusBar.backgroundColorByHexString("#33000000");
      // }
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#33000000');
      }
      this.splashScreen.hide();
      timer(4000).subscribe(()=>this.showSplash=false)
      this.loginCheck();
    });
  }

  // Login check start
  loginCheck() {
    this.authService.autoLogin().pipe(
      take(1)
    ).subscribe(resData => {
      console.log('resData +++++++++++++++++++++++++++++++=&&&&&& (autoLogin)>', resData);
      if (resData) {
        this.checkAuthentication = true;

        this.userInfoData();
        // console.log('User have Login');
      } else {
        this.checkAuthentication = false;
        // console.log('user have NOT Login');
      }
    });
  }


  //------------------- menu item show start------------------------




  // menu data call
  mapped;
  userInfoData() {

    // console.log('main componenttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');

    this.menuPages = [];
    this.userInfodDataLoading = false;

    this.authService.globalparamsData.subscribe(res => {
      // console.log('componet.ts Toke store >>>>>>>>>>>>>>>111', res);

      this.menuPages = [];

      if (res != null || res != undefined) {
        if (res.token != undefined) {
          this.userInfodDataLoading = true;
          // this.userInfoSubscribe = this.http.get('userinfo').subscribe(
          //   (response: any) => {
          //     this.userInfodDataLoading = false;

          //     if (response.return_status > 0) {
          //       //  console.log("user info res ++++++++++++++++++++++++=>", response.return_data.menu_data.list);
          //       // console.log("user info res menu =====================>", response.return_data.menu_data.list);

          //       // ================= site information dynamic start ==========
          //       /*  this.siteInfo = response.return_data.siteinfo;
          //        this.commonUtils.setSiteInfo(response.return_data.siteinfo);
          //        console.log('this.siteInfo >>', this.siteInfo);

          //        // pageTitle
          //        this._document.getElementById('pageTitle').innerHTML = this.siteInfo.name;

          //        // fabicon set
          //        this._document.getElementById('appFavicon').setAttribute('href', this.file_url+'/'+this.siteInfo.favicon); */
          //       // ================= site information dynamic end ===========

          //       this.get_user_type = response.return_data.user_type;
          //       this.commonUtils.setUserType(response.return_data.user_type);
          //       // console.log('this.get_user_type ^^^^^^^^^^^^^^^^^^^>>>>', this.get_user_type);

          //       this.commonUtils.menuPermissionService(response.return_data.menu_data.permission);

          //       if (response.return_data.user_type == 'group') {
          //         // group login menu
          //         this.groupMenuData();

          //       } else {
          //         // super admin menu

          //         this.menuPages = []; // menu array delete data first

          //         if (response.return_data.menu_data) {

          //           if (response.return_data.menu_data.list) {
          //             this.menuPagesList = response.return_data.menu_data.list;

          //             response.return_data.menu_data.list.forEach((val, ind) => {
          //               // console.log('val >', val.pages);
          //               /* for ( var item in val.pages ){
          //                 if(val.module_id == val.pages[ item ].module_id){
          //                   this.menuPages2.push( val.pages[ item ] );
          //                 }
          //               } */

          //               // object to array convert
          //               if (val.pages != null && val.pages != '' && val.pages != undefined) {
          //                 this.mapped = Object.keys(val.pages).map(key => ({ type: key, value: val.pages[key] }));
          //               }

          //               // if(val.module_access == 1){
          //               this.menuPages.push({ 'value': val, 'pages': this.mapped });
          //               this.commonUtils.getMenudataService(this.menuPages);
          //               // }

          //             });
          //           }
          //           // console.log('mapped >', this.mapped);

          //           // console.log("this.menuPages =====================>", this.menuPages);

          //           // --active menu start---
          //           this.panelOpenState = false;
          //           if (this.menuPages != undefined || this.menuPages != null) {

          //             // console.log('this.menuPages =############====>', this.menuPages);
          //             // console.log('val2.url @@@@ 11>>', this.url_name);

          //             this.menuPages.forEach((val, ind) => {
          //               if (val.pages != null) {
          //                 val.pages.forEach((val2, ind2) => {
          //                   if (this.url_path_name == val2.value.page_url.split('/')[1]) {
          //                     val.isOpen = true;
          //                   }
          //                   /* else if(this.url_name.split('/')[1] == 'auth'){
          //                     this.menuCtrl.enable(false);
          //                   }else{
          //                     this.menuCtrl.enable(true);
          //                   } */
          //                 });
          //               }
          //             })
          //           }
          //           //active menu end
          //         }
          //       }

          //     }

          //   },
          //   errRes => {
          //     this.userInfodDataLoading = false;
          //   }
          // );
        }
      }
    });
  }

  // group login menu data start
  group_map: any = [];
  groupMenuData() {
    this.userInfodDataLoading = true;
    this.group_map = [];
    this.groupMenuDataSubscribe = this.http.get('groupclient').subscribe(
      (res: any) => {
        console.log("group login view data  res =====================>", res.return_data.client);
        this.userInfodDataLoading = false;
        if (res.return_status > 0) {
          this.menuPages = [];
          this.group_map = [];
          this.menuPagesList = res.return_data.client;

          // res.return_data.client[0] = 'dashboard';

          res.return_data.client.forEach((val, ind) => {
            // console.log('val >', val.pages);
            /* for ( var item in val.pages ){
              if(val.module_id == val.pages[ item ].module_id){
                this.menuPages2.push( val.pages[ item ] );
              }
            } */

            // object to array convert
            /* if(val.lender!= null && val.lender!= '' && val.lender != undefined){
              this.mapped = Object.keys(val.lender).map(key => ({type: key, value: val.lender[key]}));
            }
            
            console.log('this.mapped  sss>>', this.mapped); */

            /*  this.mapped = [
              {
                'page_display_name': 'group_sub_name',
                'page_url':	'/transaction-list',
                'page_icon': 'list-box',
                'value': val
              }
            ]; */


            this.group_map = [
              {
                'page_display_name': 'group_sub_name',
                'page_url': '/group-transaction-list',
                'page_icon': 'list-box'
              }
            ];

            // res.return_data.client[0].module_display_name = 'dashboard';
            /* if(ind == 0){
              val.module_display_name = 'dashboard';
            }else{
              val.module_display_name = val.name;
              val.module_icon = 'list';
            } */
            // this.mapped.value.page_url = '/brokerage-list';

            val.module_display_name = val.name;
            val.module_icon = 'list';

            this.menuPages.push({ 'value': val, 'pages': this.group_map });


            // console.log('this.menuPages sss >>', this.menuPages);


          });
        }
      },
      errRes => {
        this.userInfodDataLoading = false;
      }
    );
  }

  // on click function call
  groupLoginData: any = {};
  onClickGroupItem(pIndex, cIndex, indentifire, _item, _itemsArray) {

    console.log('pIndex >', pIndex);
    console.log('indentifire >', indentifire);
    this.parentSelectedIndex = pIndex;
    this.childSelectedIndex = indentifire;
    this.isActive = !this.isActive;
    this.groupLoginData = {
      'indentifire': indentifire,
      'item': _item,
      'itemsArray': _itemsArray
    }
  }

  // ============site information get start =============
  site_path;
  site_href;
  site_href_split;
  site_path_split;
  site_url_name;


  ngOnDestory() {
    if (this.versionSubscribe !== undefined) {
      this.versionSubscribe.unsubscribe();
    }
    if (this.AppConfigSubscribe !== undefined) {
      this.AppConfigSubscribe.unsubscribe();
    }

  }
}
