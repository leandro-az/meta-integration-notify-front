import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedin?: boolean = false;
  socialUser!: SocialUser;
  title: any;
  // constructor(
  //   // private formBuilder: FormBuilder,
  //   private authService: SocialAuthService
  // ) {}

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );
  }

  // loginWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }
  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
    // this.authService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    //   console.log(this.socialUser);
    // });
    // if (this.isLoggedin) {
    //   this.router.navigate(['/leads']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
    console.log('AppComponent')
  }
  logOut(): void {
    this.authService.signOut();
  }
}
