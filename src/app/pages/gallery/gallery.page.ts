import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {


  tab : any;
  dashboard_btn : any;
  gallery_btn : any;
  account_btn : any;
  Clicked : boolean;

  constructor() { }

  ionViewWillEnter() {
    this.tab='gallery_btn';
  }

  ngOnInit() {
    
  }
  
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    // autoplay:true,
    speed: 400,
    slidesPerColumn: 1,
    slidesPerGroup: 1,
    watchSlidesProgress: true
    
  };
  onClick(check){
    //    console.log(check);
        if(check==1){
          this.tab = 'dashboard_btn';
          console.log('dashboard>>',this.tab);
        }else if(check==2){
          this.tab = 'gallery_btn';
          console.log('gallery>>',this.tab);
        }else{
          this.tab = 'account_btn';
          console.log('account>>',this.tab);
        }    
      
    }

  //  onSwitch(check){
 
  //    switch (check) {
  //     case 1:
  //       return 'dashboard_btn';
  //     case 2:
  //       return 'gallery_btn';
  //     case 3:
  //       return 'account_btn';
  //   }
  // }

}
