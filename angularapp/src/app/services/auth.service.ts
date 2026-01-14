import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string = 'http://localhost:8080/api';

  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem('LogggedInUser');
    if (storedUser) {
      this.loggedInUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Session Management
  logInSaveSession(jsonData: string): void {
    sessionStorage.setItem('LogggedInUser', jsonData);
    this.loggedInUserSubject.next(JSON.parse(jsonData));
    console.log('Stored in session storage');
  }

  logOut(): void {
    sessionStorage.removeItem('LogggedInUser');
    this.loggedInUserSubject.next(null);
  }

  //  User Info API
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  //  Token Utilities
  getToken(): string | null {
    const userData = sessionStorage.getItem('LogggedInUser');
    if (!userData) return null;

    try {
      const parsed = JSON.parse(userData);
      return parsed.token || null;
    } catch {
      console.log('Error parsing token from session');
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Math.floor(Date.now() / 1000) > payload.exp;
    } catch {
      return true;
    }
  }

  //  Token Decoding Helpers
  private decodeToken(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getUserRole(token: string): string | null {
    const payload = this.decodeToken(token);
    console.log(payload);
    return payload?.role || null;
  }

  getUsername(): string | null {
    const token = this.getToken();
    const payload = this.decodeToken(token!);
    return payload?.name || null;
  }

  getEmail(): string | null {
    const token = this.getToken();
    const payload = this.decodeToken(token!);
    return payload?.email || null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    const payload = this.decodeToken(token!);
    return payload?.userId || null;
  }

  //  Auth API Calls
  register(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, user).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>error)
      })
    );
  }

  login(login: Login): Observable<ApiResponse<User>> {
    console.log('in auth service');
    
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/login`, login).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        return throwError(()=>error)
      })
      
    );
  }


  getAllUsers():Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  sendOtp(email:string):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/email/send-otp?email=${email}`,null);
  }

  verifyOtp( { email, otpInput }:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/email/verify-otp`,{email,otpInput});
  }


  resetPassword({email,newPassword,confirmPassword}:any):Observable<ApiResponse<null>>
  {
    console.log({email,newPassword,confirmPassword});
    return this.http.put<ApiResponse<null>>(`${this.apiUrl}/email/reset-password`,{email,newPassword,confirmPassword}).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        return throwError(()=>error);
      })
    );
  }
}