import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { environment } from 'src/environments/environment';


import { Camera } from '@awesome-cordova-plugins/camera/ngx';
@Component({
  selector: 'app-home-work-add',
  templateUrl: './home-work-add.page.html',
  styleUrls: ['./home-work-add.page.scss'],
})
export class HomeWorkAddPage implements OnInit {

  selectedCar: number;
  message: string;
  private getSubjectSubscribe: Subscription;
  private getTemplateByIdSubscribe: Subscription;
  private addHomeworkSubscribe: Subscription;
  private getHomeWorkIdSubscribe: Subscription;
  subject: any;
  model: any = {};
  recipientList = [{ 'name': 'Father Mob.number' }, { 'name': 'Mother Mob.number' }, { 'name': 'Student Mob.number' }]
  recipient: any;
  storeData: any;
  myFiles:string [] = [];
  length: any;
  vlength: number;
  myFilesVideo:string [] = [];homeworkId: number;
  homeworkList: any;
  homeworkListData: [];
  type: string;
  imageUrls;
  file_url = environment.fileUrl;
  videoData: any=[];
  imageData: any=[];  
  removeFile:any =[];
  imagesedit: any=[];
  videoedit: any=[];
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private commonUtils: CommonUtils,
    private activatedRoute: ActivatedRoute,
    private camera : Camera,
    ) { }

  ngOnInit() {
    // Camera.requestPermissions({permissions:['photos']})
    let student= JSON.parse(localStorage.getItem('studentHomework'));
    console.log(student["student"]);
    this.homeworkId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type="Add";
    if(this.homeworkId != 0)
    {
    this.type="Edit";

      this.getHomeWorkId(this.homeworkId)
    }
    
    this.getSubject()
  }

  getHomeWorkId(_id)
  {
    this.getHomeWorkIdSubscribe = this.http.get('getHomworkById/'+_id).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
            this.homeworkList=res.return_data.homework_student_map;
            this.homeworkListData =res.return_data.student_edit_data;
            console.log('this.model',   this.homeworkList);
            let imageData=res.return_data.homework_image;
            // imageData.filter(book => book.type=="Video");
           
            this.imagesedit= imageData.filter(book => book.type=="image");
            this.videoedit= imageData.filter(book => book.type=="video");
            this.model = {
              title : res.return_data.student_edit_data.title,
              subject_id : res.return_data.student_edit_data.subject_id,
              submission_date : res.return_data.student_edit_data.submission_date,
              description : res.return_data.student_edit_data.description,
            }

            console.log('this.model',   this.model);
            
         
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    ); 
  }

  ionViewWillEnter() 
  {
    let student= JSON.parse(localStorage.getItem('studentHomework'));
    console.log(student["student"]);
  this.homeworkId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type="Add";
    if(this.homeworkId != 0)
    {
    this.type="Edit";

      this.getHomeWorkId(this.homeworkId)
    }
    this.getSubject();
  }
 
  getSubject()
  {
    let subject_url = 'subject'
    this.getSubjectSubscribe = this.http.get(subject_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          this.subject=res.return_data;  
        }
      }
    );
  }

  // ---------Multiple Image File Upload---------
  getFileImageDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      
      this.myFiles.push(e.target.files[i]);
      this.length =this.myFiles.length;

    }
    console.log(this.myFiles)
    console.log("Length>>>>>",this.length);
  }
  // ---------Multiple Image File Upload---------
 

   url;
  format;
  imagespreview:any = [];
  videopreview:any = [];
  optionsImage(){

  }
  
  // get camera
  imgURL;
  getCamera() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG
    }).then((res) => {
      console.log('ddd',res)
      this.imgURL = res;
      
     this.fileadd(this.DataURIToBlob('data:image/jpeg;base64,'+res));
      
    }).catch(e => {
      console.log(e);
      
    })
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }



  onSelectFile(event) {
   
    let fileData=event.target.files;
    for (let i = 0; i < fileData.length; i++) {
    let file = event.target.files && event.target.files[i];
  // console.log(event.target.files[i]);
  this.fileadd(file);
  }
  }
  removeImg(index,type)
  {
    console.log(index,type)
    if(type == 'video')
    {
      this.videopreview.splice(index,1);
      this.videoData.splice(index,1);
    }else if(type == 'image')
    {
      this.imagespreview.splice(index,1);
      this.imageData.splice(index,1);
    }
    // this.imagespreview.splice(index,1);
    console.log(this.imagespreview.length);
  }

  
  removeImgAdd(type,id,data,index)
  {
    this.removeFile.push({"type":type, "id":id, "file":data});
    // this.removeImg(index,type)
    if(type == 'video')
    {
      this.videoedit.splice(index,1);
    }else if(type == 'image')
    {
      this.imagesedit.splice(index,1);
    }
    
  }
  // removeImg end
  getFileVideoDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      
      this.myFilesVideo.push(e.target.files[i]);
      this.vlength =this.myFilesVideo.length;

    }
    console.log(this.myFilesVideo)
    console.log("Length>>>>>",this.vlength);
  }
// -------Submit Form Start------
  onSubmit(_form: NgForm){
    console.log(_form.value);
    let fd = new FormData();
    for (let val in _form.value) {
      if(_form.value[val] == undefined){
        _form.value[val] = '';
      }
    fd.append(val, _form.value[val]);
  };
  console.log(this.imageData,this.videoData);
  
  for (let i = 0; i < this.imageData.length; i++) { 
    fd.append("imageFile", this.imageData[i]);
  }

  for (let i = 0; i < this.videoData.length; i++) { 
    fd.append("videoFile", this.videoData[i]);
  }

  let student= JSON.parse(localStorage.getItem('studentHomework'));
  console.log(student["student"]);
  
  fd.append("student",JSON.stringify(student["student"]));
  fd.append("sent_to",student["type"]);
  fd.append("class_id",student["class_id"]);
  fd.append("division_id",student["division_id"]);
  let homework_url="addhomeworkdata"
  if(this.type=='Edit')
  {
   homework_url="edithomeworkdata"
  fd.append("id",this.homeworkId.toString());
  fd.append("remove",JSON.stringify(this.removeFile));

  }

  this.addHomeworkSubscribe = this.http.post(homework_url,fd).subscribe(
    (res: any) => {
      if (res.return_status === 1) {
        this.subject=res.return_data;  
        this.router.navigateByUrl('/home-work');
      }
    }
  );

  _form.reset();

  }
// -------Submit Form End------

  ngOnDestory() {
    if (this.getSubjectSubscribe !== undefined) {
      this.getSubjectSubscribe.unsubscribe();
    }
    if (this.getTemplateByIdSubscribe !== undefined) {
      this.getTemplateByIdSubscribe.unsubscribe();
    }
    if (this.addHomeworkSubscribe !== undefined) {
      this.addHomeworkSubscribe.unsubscribe();
    }
  }
////////////////////VIDEO AND IMAGE UPLOAD////
  fileadd(file)
  {
    console.log(file);
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
        this.imageData.push(file); 
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
        this.videoData.push(file);
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        if(this.format == 'video')
        {
          this.videopreview.push(this.url);
        }else if(this.format == 'image')
        {
          this.imagespreview.push(this.url);
        }
      }
      console.log(this.videoData,this.imageData);
  }
}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter homework description...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}
