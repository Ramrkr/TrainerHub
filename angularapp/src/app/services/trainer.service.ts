import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { PaginatedTrainers } from '../models/paginatedTrainers.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  // public apiUrl:string='http://localhost:3001/trainers';

  public apiUrl:string='http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  getAllTrainers():Observable<any>
  {
    return this.http.get(`${this.apiUrl}/trainer`);
  }

  getTrainerById(trainerId:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/trainer/${trainerId}`);
  }

  addTrainer(trainer:Trainer):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/trainer`,trainer);
  }

  updateTrainer(trainerId:number,trainer:Trainer):Observable<any>
  {
    return this.http.put(`${this.apiUrl}/trainer/${trainerId}`,trainer);
  }

  deleteTrainer(trainerId:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/trainer/${trainerId}`);
  }


  getTrainersByPages(page:number,size:number):Observable<PaginatedTrainers>
  {
    return this.http.get<any>(`${this.apiUrl}/trainers?page=${page}&size=${size}`);
  }
}
