import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

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
    private sessionService: SessionService,
    private userService: UserService
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
          this.sessionService.putToken(user.idToken);
          this.userService
            .getUserByEmail(user.email)
            .then((result) => {
              this.sessionService.setUserIdSession(result.userId);

              this.router.navigate(['/main/leads']);
            })
            .catch((err) => {
              console.log(err);
              this.authService
                .signOut()
                .then(() => {
                  this.sessionService.clearAllInfos();
                  this.router.navigate(['/login']);
                })
                .catch(() => {
                  this.sessionService.clearAllInfos();
                  this.router.navigate(['/login']);
                });
            });
        }
      });
    }
  }
}
