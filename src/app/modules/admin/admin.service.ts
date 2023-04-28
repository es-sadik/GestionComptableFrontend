import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagePermission } from 'src/app/entities/page-permission';
import { User } from 'src/app/entities/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl ="http://localhost:8084/api/user/";
  private permissionUrl ="http://localhost:8084/api/permission/getAll";
  constructor(private httpClient: HttpClient) {}

  //ifExist
  checkIfExistUsername(userName: string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"ifExist"}/${userName}`);
  }

 
  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl+"getAll"}`);
  }

  getUserById(id: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"getOne"}/${id}`);
  }

  getUserByUserName(userName: string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"getOneByUserName"}/${userName}`);
  }

  getUserListWithoutAdmin(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl+"getAllNoAdmin"}`);
  }

  getUserByIdWithoutAdmin(id: number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"getOneNoAdmin"}/${id}`);
  }
  addUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl+"add"}`, user);
  }
  
  updateUser( id: number, user: User) :Observable<User>{
    return this.httpClient.put<User>(`${this.baseUrl+"update"}/${id}`,user);
  }
  updateAdmin( id: number, user: User) :Observable<User>{
    return this.httpClient.put<User>(`${this.baseUrl+"updateAdmin"}/${id}`,user);
  }

  deleteUserById(id: number):Observable<User>{
   return this.httpClient.delete<User>(`${this.baseUrl+"delete"}/${id}`);
  }

  getAllPagePermission(): Observable<PagePermission[]>{
    return this.httpClient.get<PagePermission[]>(`${this.permissionUrl}`);
  }

}
