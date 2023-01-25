import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-student-home-work',
  templateUrl: './student-home-work.page.html',
  styleUrls: ['./student-home-work.page.scss'],
})
export class StudentHomeWorkPage implements OnInit {
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  @ViewChild('imgPreviewDialog', { static: true }) imgPreviewDialog: TemplateRef<any>;
  @ViewChild('videoDialog', { static: true }) videoDialog: TemplateRef<any>;
  @ViewChild('vidPreviewDialog', { static: true }) vidPreviewDialog: TemplateRef<any>;

  id: string;
  homework_list_url: string;
  private homeworkListSubscribe: Subscription;
  list: any;
  homeworkData: any;
  videoData:any[]=[];
 
  imageData: any[]=[];
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  imageDatalength: number;
  videoDatalength: number;
  imgPreviewPath: any;
  vidPreviewPath: any;
    constructor(
      private dialog: MatDialog,
      private http: HttpClient, 
      private router: Router, 
      private commonUtils: CommonUtils,
      private activatedRoute: ActivatedRoute,
      ) { }
  
  
  ngOnInit() {
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getHomeWorkData(this.id)

  }
  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getHomeWorkData(this.id)

  }
  getHomeWorkData(id) {

    this.homework_list_url = 'homworkimage/'+id;
    this.homeworkListSubscribe = this.http.get(this.homework_list_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          console.log('getHomeWorkData', res.return_data);
          this.homeworkData=res.return_data.homeworkData;
          this.list = res.return_data.homework_images;

          this.imageData = this.list.filter(book => book.type=='image')
          this.videoData = this.list.filter(book => book.type=='video')
          this.imageDatalength=this.imageData.length;
          this.videoDatalength=this.videoData.length;
          console.log("image",this.imageData.length);
          console.log("video",this.videoData);
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  
  ngOnDestory() {
    if (this.homeworkListSubscribe !== undefined) {
      this.homeworkListSubscribe.unsubscribe();
    }
  }
  openDialogWithoutRef() {
    this.dialog.open(this.secondDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
   
  }
  openDialogImgPreview(path) {
    this.dialog.open(this.imgPreviewDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
   this.imgPreviewPath = path;
  }
  openDialogclose() {
    this.dialog.closeAll();
  }
  openDialog() {
    this.dialog.open(this.videoDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }
  openDialogVidPreview(path) {
    this.dialog.open(this.vidPreviewDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
   this.vidPreviewPath = path;
  }
  pzProperties = {
    zoomControlScale: 2,
    minScale: 2,
    limitPan: true,
    limitZoom: 20,
    wheelZoomFactor: 1
  };
}
