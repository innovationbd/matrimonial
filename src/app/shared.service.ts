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
  isLoggedIn:any = [];
  /*isLoggedIn = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
  ];*/
  constructor(private http:HttpClient) { }

  logout() :void {
   //localStorage.setItem('isLoggedIn','false');
   //localStorage.removeItem('token');
   this.isLoggedIn=false;
   }
  getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
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
    return this.http.put (this.APIUrl + '/adminuser/', val);
  }
  deleteAdminUser(val:any) {
    return this.http.delete (this.APIUrl + '/adminuser/' + val);
  }

  getTempList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/tempuser');
  }
  addTempUser(val:any) {
    return this.http.post (this.APIUrl + '/tempuser', val);
  }
  updateTempUser(val:any) {
    return this.http.put (this.APIUrl + '/tempuser/', val);
  }
  deleteTempUser(val:any) {
    return this.http.delete (this.APIUrl + '/tempuser/' + val);
  }


  getMaleUserList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/maleuser');
  }
  addMaleUser(val:any) {
    return this.http.post (this.APIUrl + '/maleuser', val);
  }
  updateMaleUser(val:any) {
    return this.http.put (this.APIUrl + '/maleuser/', val);
  }
  deleteMaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/maleuser/' + val);
  }

  getFemaleUserList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/femaleuser');
  }
  addFemaleUser(val:any) {
    return this.http.post (this.APIUrl + '/femaleuser', val);
  }
  updateFemaleUser(val:any) {
    return this.http.put (this.APIUrl + '/femaleuser/', val);
  }
  deleteFemaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/femaleuser/' + val);
  }


  sendEmail(val:any) {
    return this.http.post (this.APIUrl + '/sendmail', val);
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
