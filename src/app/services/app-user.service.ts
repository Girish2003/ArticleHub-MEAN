import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  url=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  login(data:any){
    return this.httpClient.post(this.url+"/appUser/login",data,
    {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  addNewAppUser(data:any){
    return this.httpClient.post(this.url+"/appUser/addNewAppuser",data,
    {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getAllAppUser(){
    return this.httpClient.get(this.url+"/appUser/getAllAppUsers");
  }


  updateUser(data:any){
    return this.httpClient.post(this.url+"/appUser/Updateuser",data,
    {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }


  updateUserStatus(data:any){
    return this.httpClient.post(this.url+"/appUser/UpdateuserStatus",data,
    {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}
