import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Register} from './register';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  password: string;
  repeatPassword: string;
  error: string;
  constructor(private registerService: RegisterService, private router: Router) {
  }

  ngOnInit() {
  }

  public register(f: NgForm) {

      this.registerService.register(new Register(f.value.email, f.value.firstName, f.value.lastName, f.value.password)).subscribe(
        data => {
          this.router.navigateByUrl('/login');

        }, error1 => {
            this.error = error1.error;
        });
  }
}
