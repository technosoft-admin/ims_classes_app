import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, shareReplay, retry, map, catchError, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthLoginService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { CommonUtils } from '../common-utils/common-utils';

const API_URL = environment.apiUrl;
const API_MASTER = environment.apiMaster;
const API_KEY = environment.apiKey;

/* tslint:disable */ 

@Injectable()
export class InterceptorProvider implements HttpInterceptor {
  isparams = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private authService : AuthLoginService,
    private commonUtils: CommonUtils
) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let appKey;
    let authorization;
    let url;
    // Keeps the original request params. as a new HttpParams
    let newParams = new HttpParams({fromString: request.params.toString()});
  
    let get_global_params = this.authService.getTokenSessionMaster();
    console.log('get_global_params intercepter >>>>>>>>>>>>>>>>', get_global_params);
   
    if(get_global_params != null && get_global_params.master == undefined){
      get_global_params.master = API_MASTER;
    }

    if(get_global_params != null && get_global_params.token !== undefined &&get_global_params.session !== undefined && get_global_params.master !== undefined){
      
      // newParams = newParams.append('token', get_global_params.token);
      // newParams = newParams.append('session', get_global_params.session);
      // newParams = newParams.append('master', get_global_params.master); 

      
    }
    console.log('newParams >>>>>>>', get_global_params);
    
    if(get_global_params == null || get_global_params.token == null){
      appKey = API_KEY;
      authorization = 'Bearer'
      console.log('appkey false');
      url=`${API_URL}/${request.url}`
    }else {
      appKey = API_KEY;
      authorization = 'Bearer '+get_global_params.token;
      let user_type=get_global_params.user.user_type;
      if(user_type=='teacher')
      {
      url= `${API_URL}/${user_type}/${request.url}`
      }
      else
      {
        url=`${API_URL}/${request.url}`
      }
      
    }
    
    // Clone the request with params instead of setParams

    if(appKey) {
      console.log('appKey', appKey);

      const requestClone = request.clone({
        // url: `${API_URL}/${request.url}`,
        url:url,
        setHeaders: {
          'APP-KEY': appKey,
          'Authorization': authorization,
        }
      });

      // return next.handle(requestClone);
      return next.handle(requestClone).pipe(
        map((event: HttpEvent<any>) => {
          let eventUrl;
          if (event instanceof HttpResponse) {

            if(event.body.return_status == 0){
              //this.router.navigateByUrl('/auth');
              // this.authService.logout();
              this.commonUtils.presentToast('error', event.body.return_message);
            }

            //token expire check
            if(event.body.return_token_expire){
              //this.router.navigateByUrl('/auth');
              this.authService.logout();
            }

            //show return_message
            if(!event.body.return_token_expire){
              // this.commonUtils.presentToast('info', event.body.return_message);
            }

          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {

          // this.router.navigateByUrl('/auth');

          console.log("interceptor error handeller >>", error.error);

          if (error.status === 0) {
            this.commonUtils.presentToast('error', 'Please Check Your Network Connection!');
            /* this.router.navigateByUrl('/auth');
            console.log('<< please check your network connection! >>'); */
          }else if(error.status === 404){
            this.commonUtils.presentToast('error', 'Could not sign you up, please try again');
          }else if(error.status === 500){
            this.commonUtils.presentToast('error', 'Internal Server Error');
            /* this.commonUtils.presentToast('success', 'Internal Server Error');
            this.commonUtils.presentToast('info', 'Internal Server Error'); */
          }else if(error.status === 401){
            this.commonUtils.presentToast('error', error?.error?.message);
            this.authService.logout();
            this.router.navigateByUrl('/auth');
          }
          return throwError(error);
        })
      );
    }
    
  
    
  }
  
  }

  
