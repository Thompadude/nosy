// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
//
// @Injectable()
// export class AuthGuardService extends KeycloakAuthGuard {
//
//   constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
//     super(router, keycloakAngular);
//   }
//
//   isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       if (!this.authenticated) {
//         this.keycloakAngular.login();
//         return;
//       }
//
//       const requiredRoles = route.data.roles;
//       if (!requiredRoles || requiredRoles.length === 0) {
//         return resolve(true);
//       } else {
//         if (!this.roles || this.roles.length === 0) {
//           resolve(false);
//         }
//         let granted: boolean = false;
//         for (const requiredRole of requiredRoles) {
//           if (this.roles.indexOf(requiredRole) > -1) {
//             granted = true;
//             break;
//           }
//         }
//         resolve(granted);
//       }
//     });
//   }
// }
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from './global.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  isActive: boolean;

  constructor(private globalService: GlobalService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.isActive = false;
    return this.globalService.isAuthenticated().map(response => {
      if (response === true) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    });


  }

}
