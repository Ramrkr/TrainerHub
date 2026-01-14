import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from '../models/requirement.model';
import { PaginatedRequirements } from '../models/paginatedRequirements.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  public apiUrl:string='http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  getAllRequirements():Observable<any>
  {
    return this.http.get(`${this.apiUrl}/requirement`);
  }

  getRequirementById(requirementId:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/requirement/${requirementId}`);
  }

  addRequirement(requirement:Requirement):Observable<any>
  {
    console.log('in service');
    return this.http.post(`${this.apiUrl}/requirement`,requirement);
  }

  updateRequirement(requirementId:any,requirement:Requirement):Observable<any>
  {
    return this.http.put(`${this.apiUrl}/requirement/${requirementId}`,requirement);
  }

  // updateRequirement(requirementId:number,requirement:Requirement):Observable<any>
  // {
  //   return this.http.put(`${this.apiUrl}/requirement/${requirementId}`,requirement);
  // }

  getRequirementsByTrainerId(trainerId:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/trainer/${trainerId}`);
  }

  deleteRequirement(id:number):Observable<void>
  {
    console.log('in delete sevice');
    console.log(id);
    return this.http.delete<void>(`${this.apiUrl}/requirement/${id}`);
  }

  // deleteRequirement(requirementId:number):Observable<void>
  // {
  //   return this.http.delete<void>(`${this.apiUrl}/${requirementId}`);
  // }



  ///-----------------pagination--------------------///

  getRequirementsByPages(page:number,size:number):Observable<PaginatedRequirements>
  {
    return this.http.get<PaginatedRequirements>(`${this.apiUrl}/requirements?page=${page}&size=${size}`)
  }

}
