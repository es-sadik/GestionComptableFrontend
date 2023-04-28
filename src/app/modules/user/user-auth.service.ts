import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private encryptSecretKey  = "LAHCEN&&MARWANE"

  constructor() { }
  setRoles(roles: []) {
    localStorage.setItem('roles', this.encryptData(roles));
  }

  getRoles(): [] {
    return this.decryptData( localStorage.getItem('roles') as any )
    
  }

  setPermissions(permissions: []) {
    localStorage.setItem('permissions', this.encryptData(permissions));
  }

  getPermissions(): [] {
    return this.decryptData(localStorage.getItem('permissions') as any);
  }

  setUserName(userName:string){
    localStorage.setItem('userName', this.encryptData(userName));
  }

  getUserName() {
    return this.decryptData( localStorage.getItem('userName') );
  }
 
  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn() {
    if(this.getRoles() && this.getToken()){
      return true;
    }
    else{
      return false;
    }
  }

  

   private encryptData(data: any) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      return "hello"
    }
  }

  private decryptData(data:any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return "hello"
    }
  }

  
  

  
}
