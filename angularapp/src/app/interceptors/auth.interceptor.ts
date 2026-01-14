import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const skipUrls=['/register','/login','/send-otp','verify-otp','/reset-password'];

    const shouldSkip=skipUrls.some(url=>request.url.includes(url));
    console.log(skipUrls);
    
    console.log('interceptor works');
    if(shouldSkip)
    {
      console.log('req sent');
      
      return next.handle(request);
    }
    else
    {
      const token=JSON.parse(sessionStorage.getItem('LogggedInUser')!).token;
      console.log(token);
      const modifiedRequest=request.clone({setHeaders:{Authorization: `Bearer ${token}`}});
      console.log(JSON.stringify(modifiedRequest));
      console.log(`Bearer `+token);
      return next.handle(modifiedRequest);       
    }
   
  }
}
