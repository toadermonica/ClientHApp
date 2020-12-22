import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../interfaces/user';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regform: FormGroup;
  user: User;

  constructor(private readonly formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.regform = this.formBuilder.group({
      regemail: ['', Validators.required],
      regpassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitRegForm() {
    const email = this.regform.getRawValue().regemail;
    const password = this.regform.getRawValue().regpassword;
    if(email && password){
      this.user = {email, password};
      this.authenticationService.userSignUp(this.user).then(Response => {
        console.log(Response);
      });
    }
  }
}
