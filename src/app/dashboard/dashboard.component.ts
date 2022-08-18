import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: SocialUser | null = new SocialUser();
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.socialUser = this.sessionService.getUser();
    this.isLoggedin = this.socialUser ? true : false;
    if (!this.isLoggedin) this.router.navigate(['login']);
  }
}
