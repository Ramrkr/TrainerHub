import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

constructor(private authService:AuthService,private router:Router){}

canActivate(route:ActivatedRouteSnapshot):boolean | UrlTree{
  
  const expectedRole:string[] = route.data['roles'];
  const token = this.authService.getToken();

  console.log(token);

  if(expectedRole?.includes('Permit All')){
    return true;
  }

  if(!token || this.authService.isTokenExpired(token)){
    console.log("Token Null or Expired");
    return this.router.parseUrl('/login');
  }

  const userRole=this.authService.getUserRole(token);
  console.log(userRole);

  if(expectedRole && !expectedRole.includes(userRole!) ){
    console.log("Role Mismatch");
    this.authService.logOut();
    return this.router.parseUrl("/unauthorized");
    // return this.router.parseUrl("/unauthorized");
  }
  return true;

}

}