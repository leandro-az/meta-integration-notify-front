import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { SessionService } from '../services/session.service';
import { UserIntegration } from '../models/user-integration';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  defaultCredicard="XXXXX XXXX XXXXX XXXXX"
  email=""
  name=""
  phone=""
  userIntegration: UserIntegration| null = null
  socialUser?: SocialUser | null;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService,
    private sessionService : SessionService
    ) {
      this.form = fb.group({
        userIntegrationId: [""],
        integrationUrl: [""],
        integrationToken: [""],
        createdAt: [""],
        updatedAt: [""],
        // createdAt: [createdAt],
        // index: [index],
      });
     }

  ngOnInit(): void {
    console.log('RegistrationScreenComponent')
    this.getUserIntegration()
  }

  getUserIntegration(){
    this.userService.getUserIntegration(this.sessionService.getUserIdSession())
    .then(result=>{
      this.form = this.fb.group({
        userIntegrationId: [result.userIntegrationId],
        integrationUrl: [result.integrationUrl],
        integrationToken: [result.integrationToken],
        createdAt: [new Date(parseInt(result.createdAt,10)).toLocaleString()],
      });
    })
    .catch(err=>{
      console.log(err)
    })
  }


  redirectToLoging():void{
    this.router.navigate(['/login']);
  }

}

