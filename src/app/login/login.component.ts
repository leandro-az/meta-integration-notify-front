import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    this.socialUser = this.sessionService.getUser();
    this.isLoggedin = this.socialUser ? true : false;
    console.log(this.socialUser);
    if (this.isLoggedin) {
      this.router.navigate(['/main/leads']);
    } else {
      this.authService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        if (this.isLoggedin) {
          this.sessionService.putUser(user);
          this.sessionService.putToken(user.idToken)
          this.router.navigate(['/main/leads']);
        }
      });
    }
  }
}
