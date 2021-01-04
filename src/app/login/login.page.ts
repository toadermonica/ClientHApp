import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthResponse} from "../interfaces/auth-response";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  user: User;
  constructor(private readonly formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async submitForm() {
    const email = this.form.getRawValue().email;
    const password = this.form.getRawValue().password;
    if (email && password){
      const user: User = {email, password};
      console.log('Now this user is: ', user);
      await this.authenticationService.userSignIn(user).then(Response => {
        console.log('This is the loggedin user: ', Response);
      });
    }
  }

  async skipLogin() {
    await this.authenticationService.fakeSignIn();
  }
}
