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
  currentUser;

  constructor(private http:HttpClient) { }

  logout() :void {
   localStorage.setItem('isLoggedOut','True');
   //localStorage.removeItem('token');

   }
   isloggedin() {
     if(localStorage.getItem('fromloginpage') == "True") {
       localStorage.removeItem('fromloginpage');
       return true;
     }
     else {
       if(localStorage.getItem('usertype')=='1') {
         this.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.currentUser = data;
           var token = this.currentUser.userToken;
           if(token == localStorage.getItem('usertoken')) {
             var UserToken = this.getRandomInt(12345678,87654321);
             localStorage.setItem('usertoken', UserToken);
             this.updateMaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
             return true;
           }
           else {
             return false;
           }
         });
       }
       else if(localStorage.getItem('usertype')=='2') {
         return this.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.currentUser = data;
           var token = this.currentUser.userToken;
           if(token == localStorage.getItem('usertoken')) {
             var UserToken = this.getRandomInt(12345678,87654321);
             localStorage.setItem('usertoken', UserToken);
             this.updateFemaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
             return true;
           }
           else {
             return false;
           }
         });
       }
     }
   }
  getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
   getDateTime(today=new Date()) {
     //return datetime in the format '2022-12-22 00:00:04'
     //database datetime format '2022-01-28T15:07:37Z'
     //var today = new Date();
     var dd = String(today.getDate());
     var mm = String(today.getMonth() + 1); //January is 0!
     var hh = String(today.getHours());
     var mn = String(today.getMinutes());
     var ss = String(today.getSeconds());
     var yyyy = today.getFullYear();
     return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mn+':'+ss;
   }
  isAdmin() {
    return false;
  }

  mEncrypt(val) {
    return btoa(btoa(btoa(val)));
  }

  getAdminList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/adminuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/adminuser/' + id);
    }
  }
  addAdminUser(val:any) {
    return this.http.post (this.APIUrl + '/adminuser', val);
  }
  updateAdminUser(val:any) {
    return this.http.put (this.APIUrl + '/adminuser', val);
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
    return this.http.put (this.APIUrl + '/tempuser', val);
  }
  deleteTempUser(val:any) {
    return this.http.delete (this.APIUrl + '/tempuser/' + val);
  }


  getMaleUserList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/maleuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/maleuser/' + id);
    }
  }
  addMaleUser(val:any) {
    return this.http.post (this.APIUrl + '/maleuser', val);
  }
  updateMaleUser(val:any) {
    return this.http.put (this.APIUrl + '/maleuser', val);
  }
  deleteMaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/maleuser/' + val);
  }

  getFemaleUserList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/femaleuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/femaleuser/' + id);
    }
  }
  addFemaleUser(val:any) {
    return this.http.post (this.APIUrl + '/femaleuser', val);
  }
  updateFemaleUser(val:any) {
    return this.http.put (this.APIUrl + '/femaleuser', val);
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
