import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { User } from 'src/app/entities/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl ="http://localhost:8084/api";

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) {}
 
  loging(user: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl+"/authenticate"}`,user,{headers: this.requestHeader});
  }

  roleMatch(allowedRoles : any) {
    
    const userRoles: any = this.userAuthService.getRoles();


    if (userRoles != null && userRoles) {

      for (let i = 0; i < userRoles.length; i++) {

        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            
            return true;
          }

        }

      }

    }
    return false;
  }

  permissionMatch(allowedPermissions : any ){

    const userPermissions: any = this.userAuthService.getPermissions();

    if (userPermissions != null && userPermissions) {

      for (let i = 0; i < userPermissions.length; i++) {

        for (let j = 0; j < allowedPermissions.length; j++) {
          if (userPermissions[i].namePermission === allowedPermissions[j]) {
            return true;
          }

        }

      }

    }

    return false;
  }
}
