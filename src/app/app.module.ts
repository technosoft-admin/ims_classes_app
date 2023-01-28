import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { InterceptorProvider } from './services/interceptors/interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer/ngx';  
import {  File  } from '@ionic-native/file/ngx';  

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    FormsModule,  
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    
  ],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: InterceptorProvider,
  //   multi: true
  // },],
  providers: [
    FileTransfer,  
    FileTransferObject,  
    File, 
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
    SmsRetriever,
    StatusBar,
    SplashScreen,
    FirebaseX,
    Camera,
    

  ],
  bootstrap: [AppComponent],
  exports: [ 
    MatDialogModule,
  ]
})
export class AppModule {
  
}
