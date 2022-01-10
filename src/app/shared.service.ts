import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from './interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";
//readonly APIUrl = "https://marufbuet.pythonanywhere.com";
//readonly PhotoUrl = "https://marufbuet.pythonanywhere.com/media/";

  constructor(private http:HttpClient) { }

  logout() :void {
   localStorage.setItem('isLoggedIn','false');
   localStorage.removeItem('token');
   }

  isAdmin() {
    return false;
  }

  mEncrypt(val) {
    return btoa(btoa(btoa(val)));
  }

  getAdminList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/adminuser');
  }

  addAdminUser(val:any) {
    return this.http.post (this.APIUrl + '/adminuser', val);
  }

  updateAdminUser(val:any) {
    return this.http.put (this.APIUrl + '/adminuser', val);
  }

  deleteAdminUser(val:any) {
    return this.http.delete (this.APIUrl + '/adminuser' + val);
  }


  getMaleUserList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/maleuser');
  }

  addMaleUser(val:any) {
    return this.http.post (this.APIUrl + '/maleuser', val);
  }

  updateMaleUser(val:any) {
    return this.http.put (this.APIUrl + '/maleuser', val);
  }

  deleteMaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/maleuser' + val);
  }



  getEmpList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/employee/');
  }

  addEmployee(val:any) {
    return this.http.post (this.APIUrl + '/employee/', val);
  }

  updateEmployee(val:any) {
    return this.http.put (this.APIUrl + '/employee/', val);
  }

  deleteEmployee(val:any) {
    return this.http.delete (this.APIUrl + '/employee/' + val);
  }


  UploadPhoto(val:any) {
    return this.http.post (this.APIUrl + '/SaveFile', val);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/department/');
  }

}
