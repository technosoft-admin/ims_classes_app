import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {
check;
check2;
check3;
check4;
check5;
check6;
check7;
check8;
check9;
check10;
check11;
check12;
check13;
check14;
check15;
rating;
rating2;
rating3;
rating4;
rating5;
rating6;
rating7;
rating8;
rating9;
rating10;
rating11;
rating12;
rating13;
rating14;
rating15;

reviewquestion=[
          {'id':1,'question':'i) How the Subject contents are covered by teacher?'},
          {'id':2,'question':'ii) How clearly the concepts are taught by teacher?'},
          {'id':3,'question':'iii) How would you rate the teaching for application of concepts for solving questions?'},
          {'id':4,'question':'iv) How would you rate the teaching speed?'},
          {'id':5,'question':'v) What do you expect about teaching speed from the teacher?'},
          {'id':6,'question':'vi) How encouraging do you feel to ask your difficulties to the teacher?'},
          {'id':7,'question':'vii) How would you rate the solutions provided to your doubts and difficulties?'},
          {'id':8,'question':'viii) How would you rate quality of the questions asked in Test Papers?'},
          {'id':9,'question':'ix) How would you rate the Test Question Paper Explanation?'},
          {'id':10,'question':'x) How does the lecture duration match to your expectation?'},
          {'id':11,'question':'xi) How would you rate the punctuality of the teacher?'},
          {'id':12,'question':'xii) How would you rate the Notes provided to you?'},
          {'id':13,'question':'xiii) How efficiently & interactively do the teacher engages all students in online class?'},
          {'id':14,'question':'xiv) Do you think that your teacher works hard to improve your result?'},
          {'id':15,'question':'xv) How would you overall rate the teacher in all aspect?'},

        ];
shortquestion=[
            {'id':1,'squestion' : 'xvi) While asking doubts do you feel pressurised or insulting by the behavior or comments by the teacher?'},
            {'id':1,'squestion' : 'xvii) Is the TEACHER Personally in contact with you on Social Media/Mobile?'},
            {'id':1,'squestion' : 'xviii) Does the teacher give wrong or negative comments about other Teachers OR Other Institutes?'},
            {'id':1,'squestion' : 'xix) Does the teacher use foul language or bad words during lecture or doubt session?'},
            {'id':1,'squestion' : 'xx) Does the teacher use mobile phone in classroom?'},
          ];
  constructor() { 

  }
  onClick(__value)
  {

    this.rating = __value;
    console.log('star>>>',this.rating);
    if(this.rating == 1 || this.rating == 2 )
    {
      this.check="Less";
      console.log('first',this.rating);
      
    }
    else if(this.rating == 3 || this.rating == 4)
    {
      this.check="Good";
    }
    else if(this.rating == 5 || this.rating == 6)
    {
      this.check="Better";
    }
    else if(this.rating == 7 || this.rating == 8)
    {
      this.check="Best";
    }
    else if(this.rating == 9 || this.rating == 10)
    {
      this.check="Excellent";
    }
  }
  onClick2(__value)
  {

    this.rating2 = __value;
    console.log('star>>>',this.rating2);
    if(this.rating2 == 1 || this.rating2 == 2 )
    {
      this.check2="Less Clear";
      console.log('first',this.rating2);
      
    }
    else if(this.rating2== 3 || this.rating2 == 4)
    {
      this.check2="Good";
    }
    else if(this.rating2 == 5 || this.rating2 == 6)
    {
      this.check2="Better";
    }
    else if(this.rating2 == 7 || this.rating2 == 8)
    {
      this.check2="Best";
    }
    else if(this.rating2 == 9 || this.rating2 == 10)
    {
      this.check2="Excellent";
    }
  }
  onClick3(__value)
  {

    this.rating3 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating3 == 1 || this.rating3 == 2 )
    {
      this.check3="Very Less";
      console.log('first',this.rating3);
      
    }
    else if(this.rating3== 3 || this.rating3 == 4)
    {
      this.check3="Good";
    }
    else if(this.rating3 == 5 || this.rating3 == 6)
    {
      this.check3="Better";
    }
    else if(this.rating3 == 7 || this.rating3 == 8)
    {
      this.check3="Best";
    }
    else if(this.rating3 == 9 || this.rating3 == 10)
    {
      this.check3="Excellent";
    }
  }
  onClick4(__value)
  {

    this.rating4 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating4 == 1 || this.rating4 == 2 )
    {
      this.check4="Very Fast";
      console.log('first',this.rating4);
      
    }
    else if(this.rating4== 3 || this.rating4 == 4)
    {
      this.check4="Fast";
    }
    else if(this.rating4 == 5 || this.rating4 == 6)
    {
      this.check4="Medium";
    }
    else if(this.rating4 == 7 || this.rating4 == 8)
    {
      this.check4="Well Paced";
    }
    else if(this.rating4 == 9 || this.rating4 == 10)
    {
      this.check4="As Expected";
    }
  }
  onClick5(__value)
  {

    this.rating5 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating5 == 1 || this.rating5 == 2 )
    {
      this.check5="Decrease Drastically";
      console.log('first',this.rating5);
      
    }
    else if(this.rating5== 3 || this.rating5 == 4)
    {
      this.check5="Increase Drastically";
    }
    else if(this.rating5 == 5 || this.rating5 == 6)
    {
      this.check5="Decrease Slightly";
    }
    else if(this.rating5 == 7 || this.rating5 == 8)
    {
      this.check5="Increase Slightly";
    }
    else if(this.rating5 == 9 || this.rating5 == 10)
    {
      this.check5="As Expected";
    }
  }
  onClick6(__value)
  {

    this.rating6 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating6 == 1 || this.rating6 == 2 )
    {
      this.check6="Discouraging";
      console.log('first',this.rating3);
      
    }
    else if(this.rating6== 3 || this.rating6 == 4)
    {
      this.check6="Neither Discouraging nor Encouraging";
    }
    else if(this.rating6 == 5 || this.rating6 == 6)
    {
      this.check6="Slightly Encouraging";
    }
    else if(this.rating6 == 7 || this.rating6 == 8)
    {
      this.check6="Encouraging";
    }
    else if(this.rating6 == 9 || this.rating6 == 10)
    {
      this.check6="Very Encouraging";
    }
  }
  onClick7(__value)
  {

    this.rating7 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating7 == 1 || this.rating7 == 2 )
    {
      this.check7="Not Satisfied";
      console.log('first',this.rating3);
      
    }
    else if(this.rating7== 3 || this.rating7 == 4)
    {
      this.check7="Good";
    }
    else if(this.rating7 == 5 || this.rating7 == 6)
    {
      this.check7="Better";
    }
    else if(this.rating7 == 7 || this.rating7 == 8)
    {
      this.check7="Best";
    }
    else if(this.rating7 == 9 || this.rating7 == 10)
    {
      this.check7="Excellent";
    }
  }
  onClick8(__value)
  {

    this.rating8 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating8 == 1 || this.rating8 == 2 )
    {
      this.check8="Irrelevant";
      console.log('first',this.rating8);
      
    }
    else if(this.rating8== 3 || this.rating8 == 4)
    {
      this.check8="Good";
    }
    else if(this.rating8 == 5 || this.rating8 == 6)
    {
      this.check8="Better";
    }
    else if(this.rating8 == 7 || this.rating8 == 8)
    {
      this.check8="Best";
    }
    else if(this.rating8 == 9 || this.rating8 == 10)
    {
      this.check8="Exam Oriented";
    }
  }
  onClick9(__value)
  {

    this.rating9 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating9 == 1 || this.rating9 == 2 )
    {
      this.check9="Not Satisfied";
      console.log('first',this.rating3);
      
    }
    else if(this.rating9== 3 || this.rating9 == 4)
    {
      this.check9="Good";
    }
    else if(this.rating9 == 5 || this.rating9 == 6)
    {
      this.check9="Better";
    }
    else if(this.rating9 == 7 || this.rating9 == 8)
    {
      this.check9="Best";
    }
    else if(this.rating9 == 9 || this.rating9 == 10)
    {
      this.check9="Excellent";
    }
  }
  onClick10(__value)
  {

    this.rating10 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating10 == 1 || this.rating10 == 2 )
    {
      this.check10="Increase Drastically";
      console.log('first',this.rating3);
      
    }
    else if(this.rating10== 3 || this.rating10 == 4)
    {
      this.check10="Decrease Drastically";
    }
    else if(this.rating10 == 5 || this.rating10 == 6)
    {
      this.check10="Increase Slightly";
    }
    else if(this.rating10 == 7 || this.rating10 == 8)
    {
      this.check10="Decrease Slightly";
    }
    else if(this.rating10 == 9 || this.rating10 == 10)
    {
      this.check10="No Change Required";
    }
  } 
  onClick11(__value)
  {

    this.rating11 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating11 == 1 || this.rating11 == 2 )
    {
      this.check11="Always Late";
      console.log('first',this.rating3);
      
    }
    else if(this.rating11== 3 || this.rating11 == 4)
    {
      this.check11="Mostly Late";
    }
    else if(this.rating11 == 5 || this.rating11 == 6)
    {
      this.check11="Sometimes Punctual";
    }
    else if(this.rating11 == 7 || this.rating11 == 8)
    {
      this.check11="Mostly Punctual";
    }
    else if(this.rating11 == 9 || this.rating11 == 10)
    {
      this.check11="Always punctual";
    }
  } 
  onClick12(__value)
  {

    this.rating12 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating12 == 1 || this.rating12 == 2 )
    {
      this.check12="Irrelevant";
      console.log('first',this.rating3);
      
    }
    else if(this.rating12== 3 || this.rating12 == 4)
    {
      this.check12="Good";
    }
    else if(this.rating12 == 5 || this.rating12 == 6)
    {
      this.check12="Better";
    }
    else if(this.rating12 == 7 || this.rating12 == 8)
    {
      this.check12="Best";
    }
    else if(this.rating12 == 9 || this.rating12 == 10)
    {
      this.check12="Excellent";
    }
  } 
  onClick13(__value)
  {

    this.rating13 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating13 == 1 || this.rating13 == 2 )
    {
      this.check13="Very Less";
      console.log('first',this.rating3);
      
    }
    else if(this.rating13== 3 || this.rating13 == 4)
    {
      this.check13="Good";
    }
    else if(this.rating13 == 5 || this.rating13 == 6)
    {
      this.check13="Better";
    }
    else if(this.rating13 == 7 || this.rating13 == 8)
    {
      this.check13="Best";
    }
    else if(this.rating13 == 9 || this.rating13 == 10)
    {
      this.check13="Excellent";
    }
  } 
  onClick14(__value)
  {

    this.rating14 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating14 == 1 || this.rating14 == 2 )
    {
      this.check14="Very Less";
      console.log('first',this.rating3);
      
    }
    else if(this.rating14== 3 || this.rating14 == 4)
    {
      this.check14="Sometimes";
    }
    else if(this.rating14 == 5 || this.rating14 == 6)
    {
      this.check14="More Hard Work Expected";
    }
    else if(this.rating14 == 7 || this.rating14 == 8)
    {
      this.check14="Always and Better Way";
    }
    else if(this.rating14 == 9 || this.rating14 == 10)
    {
      this.check14="Always Really Works Hard";
    }
  } onClick15(__value)
  {

    this.rating15 = __value;
    // console.log('star>>>',this.rating2);
    if(this.rating15 == 1 || this.rating15 == 2 )
    {
      this.check15="Not Good";
      console.log('first',this.rating3);
      
    }
    else if(this.rating15== 3 || this.rating15 == 4)
    {
      this.check15="Good";
    }
    else if(this.rating15 == 5 || this.rating15 == 6)
    {
      this.check15="Better";
    }
    else if(this.rating15 == 7 || this.rating15 == 8)
    {
      this.check15="Best";
    }
    else if(this.rating15 == 9 || this.rating15 == 10)
    {
      this.check15="Excellent";
    }
  }

  ngOnInit() {
    this.rating = 4;
    this.rating2 = 4;
    this.rating3 = 4;
    this.rating4 = 4;
    this.rating5 = 4;
    this.rating6 = 4;
    this.rating7 = 4;
    this.rating8 = 4;
    this.rating9 = 4;
    this.rating10 = 4;
    this.rating11 = 4;
    this.rating12 = 4;
    this.rating13 = 4;
    this.rating14 = 4;
    this.rating15 = 4;
    console.log( 'hello',this.rating);
    
  }
  
}
