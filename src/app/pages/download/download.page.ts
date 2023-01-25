import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  tab : any;
  phy : any;
  chem : any;
  math : any;  
  bio : any;
  list: any[];
  centered = false;

  radius: number;
  color: string;
  load = false;
  constructor() { }
  
  ngOnInit() {
    this.onLoader();
    this.list=[
      {tecname:'Kalpande Sir', chapter:'Chapter 15', subtitle:'OSCILLATION', type:'excel'},
      {tecname:'Kalpande Sir', chapter:'Chapter 14', subtitle:'OSCILLATION', type:'word'},
      {tecname:'Kalpande Sir', chapter:'Chapter 13', subtitle:'OSCILLATION', type:'img'},
      {tecname:'Kalpande Sir', chapter:'Chapter 12', subtitle:'OSCILLATION', type:'pdf'},
      {tecname:'Kalpande Sir', chapter:'Chapter 11', subtitle:'OSCILLATION', type:'excel'},
      {tecname:'Kalpande Sir', chapter:'Chapter 10', subtitle:'OSCILLATION', type:'word'},
      {tecname:'Kalpande Sir', chapter:'Chapter 9', subtitle:'OSCILLATION', type:'img'},
      {tecname:'Kalpande Sir', chapter:'Chapter 8', subtitle:'OSCILLATION', type:'pdf'},
      {tecname:'Kalpande Sir', chapter:'Chapter 7', subtitle:'OSCILLATION', type:'excel'},
      {tecname:'Kalpande Sir', chapter:'Chapter 6', subtitle:'OSCILLATION', type:'word'},
      {tecname:'Kalpande Sir', chapter:'Chapter 5', subtitle:'WAVES', type:'img'},
      {tecname:'Kalpande Sir', chapter:'Chapter 4', subtitle:'WAVES', type:'pdf'},
      {tecname:'Kalpande Sir', chapter:'Chapter 3', subtitle:'WAVES', type:'excel'},
      {tecname:'Kalpande Sir', chapter:'Chapter 2', subtitle:'WAVES', type:'word'},
      {tecname:'Kalpande Sir', chapter:'Chapter 1', subtitle:'WAVES', type:'img'},
      
  ];
  }

  onLoader(){
    this.load = true;
    console.log('this.load1', this.load);
    setTimeout(()=>{
      this.load = false;
    }, 1000);

    console.log('this.load2', this.load);
    
  }
  ionViewWillEnter() {
    this.tab='phy';
  }
  onClick(check){
    //    console.log(check);
        
    
        if(check==1){
          this.tab = 'phy';
          this.onLoader();
          this.list=[
            {tecname:'Kalpande Sir', chapter:'Chapter 15', subtitle:'OSCILLATION', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 14', subtitle:'OSCILLATION', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 13', subtitle:'OSCILLATION', type:'img'},
            {tecname:'Kalpande Sir', chapter:'Chapter 12', subtitle:'OSCILLATION', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 11', subtitle:'OSCILLATION', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 10', subtitle:'OSCILLATION', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 9', subtitle:'OSCILLATION', type:'img'},
            {tecname:'Kalpande Sir', chapter:'Chapter 8', subtitle:'OSCILLATION', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 7', subtitle:'OSCILLATION', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 6', subtitle:'OSCILLATION', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 5', subtitle:'WAVES', type:'img'},
            {tecname:'Kalpande Sir', chapter:'Chapter 4', subtitle:'WAVES', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 3', subtitle:'WAVES', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 2', subtitle:'WAVES', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 1', subtitle:'WAVES', type:'img'},
            
        ];
          
        }else if(check==2){
          this.tab = 'chem';
          this.onLoader();
          this.list=[
            {tecname:'Deshpande Sir', chapter:'Chapter 12', subtitle:'ALDEHYDE KETONES', type:'pdf'},
            {tecname:'Deshpande Sir', chapter:'Chapter 11', subtitle:'ALDEHYDE KETONES', type:'excel'},
            {tecname:'Pandey Sir', chapter:'Chapter 10', subtitle:'CHEMICAL KINETICS', type:'word'},
            {tecname:'Pandey Sir', chapter:'Chapter 9', subtitle:'CHEMICAL KINETICS', type:'img'},
            {tecname:'Deshpande Sir', chapter:'Chapter 8', subtitle:'AMINES', type:'pdf'},
            {tecname:'Deshpande Sir', chapter:'Chapter 7', subtitle:'AMINES', type:'excel'},
            {tecname:'Pandey Sir', chapter:'Chapter 6', subtitle:'CHEMICAL KINETICS', type:'word'},
            {tecname:'Pandey Sir', chapter:'Chapter 5', subtitle:'RADIOACTIVITY', type:'img'},
            {tecname:'Pandey Sir', chapter:'Chapter 4', subtitle:'RADIOACTIVITY', type:'pdf'},
            {tecname:'Deshpande Sir', chapter:'Chapter 3', subtitle:'POLYMERS', type:'excel'},
            {tecname:'Pandey Sir', chapter:'Chapter 2', subtitle:'ASSIGNMENT', type:'word'},
            {tecname:'Deshpande Sir', chapter:'Chapter 1', subtitle:'BIOMOLECULES', type:'img'},
            
        ];

        }else if(check==3){
          this.tab = 'math';
          this.onLoader();
          this.list=[
            {tecname:'Kalpande Sir', chapter:'Chapter 12', subtitle:'WAVES', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 11', subtitle:'WAVES', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 10', subtitle:'WAVES', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 9', subtitle:'WAVES', type:'img'},
            {tecname:'Kalpande Sir', chapter:'Chapter 8', subtitle:'WAVES', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 7', subtitle:'WAVES', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 6', subtitle:'WAVES', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 5', subtitle:'WAVES', type:'img'},
            {tecname:'Kalpande Sir', chapter:'Chapter 4', subtitle:'WAVES', type:'pdf'},
            {tecname:'Kalpande Sir', chapter:'Chapter 3', subtitle:'WAVES', type:'excel'},
            {tecname:'Kalpande Sir', chapter:'Chapter 2', subtitle:'WAVES', type:'word'},
            {tecname:'Kalpande Sir', chapter:'Chapter 1', subtitle:'WAVES', type:'img'},
            
        ]; 

        }else{
          this.tab = 'bio';
          this.onLoader();
          this.list=[
            {tecname:'Nand Sir', chapter:'Chapter 15', subtitle:'ANIMAL KINGDOM', type:'excel'},
            {tecname:'Nand Sir', chapter:'Chapter 14', subtitle:'ANIMAL KINGDOM', type:'img'},
            {tecname:'Nand Sir', chapter:'Chapter 13', subtitle:'ANIMAL KINGDOM', type:'word'},
            {tecname:'Nand Sir', chapter:'Chapter 12', subtitle:'ANIMAL KINGDOM', type:'pdf'},
            {tecname:'Nand Sir', chapter:'Chapter 11', subtitle:'ANIMAL KINGDOM', type:'excel'},
            {tecname:'Nand Sir', chapter:'Chapter 10', subtitle:'ANIMAL KINGDOM', type:'word'},
            {tecname:'Nand Sir', chapter:'Chapter 9', subtitle:'ANIMAL KINGDOM', type:'img'},
            {tecname:'Nand Sir', chapter:'Chapter 8', subtitle:'ANIMAL KINGDOM', type:'pdf'},
            {tecname:'Nand Sir', chapter:'Chapter 7', subtitle:'ANIMAL KINGDOM', type:'excel'},
            {tecname:'Nand Sir', chapter:'Chapter 6', subtitle:'ANIMAL KINGDOM', type:'word'},
            {tecname:'Nand Sir', chapter:'Chapter 5', subtitle:'ANIMAL KINGDOM', type:'img'},
            {tecname:'Nand Sir', chapter:'Chapter 4', subtitle:'ANIMAL KINGDOM', type:'pdf'},
            {tecname:'Nand Sir', chapter:'Chapter 3', subtitle:'ANIMAL KINGDOM', type:'excel'},
            {tecname:'Nand Sir', chapter:'Chapter 2', subtitle:'ANIMAL KINGDOM', type:'word'},
            {tecname:'Nand Sir', chapter:'Chapter 1', subtitle:'ANIMAL KINGDOM', type:'img'},
            
        ];

        }
        

      
    }

}
function check(check: any, any: any) {
  throw new Error('Function not implemented.');
}

