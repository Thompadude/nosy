import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginHttpService} from './login-http.service';
import {User} from './user';
import {ClientToken} from './client-token';
import {Router} from '@angular/router';
import {GlobalService} from '../../../auth/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validUsername: boolean;
  validUsernameMessage: 'Test';


  constructor(private loginHttpService: LoginHttpService, private router: Router, private globalService: GlobalService) { }
  ngOnInit() {

    const token = this.globalService.getLocalToken();

    if (token != null && token.trim() != '') {

      this.globalService.isAuthenticated().subscribe(
        (response) => {
          if (response === true) {
            this.router.navigate(['/dashboard']);

          }

        },
      );
    }
  }

  onSignIn(f: NgForm) {
    const email = f.value.email;

    const password = f.value.password;
    const user = new User(email, password);
    this.loginHttpService.getToken(user).subscribe(
      (response: ClientToken) => {
        this.globalService.setLocalToken(response);
       this.router.navigateByUrl('/dashboard');
      }, err => {

        this.validUsername = true;
        this.validUsernameMessage = err.error;
      }
    );
  }

  register(){
    this.router.navigateByUrl( '/register');
  }
}
