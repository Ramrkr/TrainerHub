import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { paginatedFeedbacks } from '../models/paginatedFeedbacks.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // public apiUrl:string='http://localhost:3001/feedback';

    public apiUrl:string='http://localhost:8080/api';



  constructor(private http:HttpClient) { }


  sendFeedback(feedback:Feedback):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/feedback`,feedback);
  }

  getAllFeedbacksByUserId(userId:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId:number):Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/feedback/${feedbackId}`);
  }

  getFeedbacks():Observable<any>
  {
    return this.http.get(`${this.apiUrl}/feedback`);
  }


  getFeedbacksByPages(page:number,size:number):Observable<paginatedFeedbacks>
  {
    return this.http.get<any>(`${this.apiUrl}/feedback?page=${page}&size=${size}`);
  }

}
