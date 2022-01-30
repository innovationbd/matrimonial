import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {SharedService} from 'app/shared.service';
@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private service:SharedService, private router: Router) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.service.isloggedin()) {
        localStorage.setItem('auth', 'true');
        return true;
      }
      // navigate to login page as user is not authenticated
      localStorage.setItem('auth', 'false');
   this.router.navigate(['/login']);
return false;
}
/*public isLoggedIn(): boolean {
   let status = false;
   if (this.service.isLoggedIn) {
      status = true;
   }
   else {
      status = false;
      }
   return status;
 }*/
}
