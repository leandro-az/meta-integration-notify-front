import { Component, OnInit, NgZone } from '@angular/core';
// import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { SessionService } from '../services/session.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  employees: Observable<Employee[]> | undefined;
  isIndigoTheme: boolean = false;
  dir: string = 'ltr';
  user: SocialUser | null = new SocialUser();
  isLoggedin?: boolean = false;
  socialUser?: SocialUser | null;
  userName: string = '';
  photoUrl: string = '';
  constructor(
    // private employeeService: EmployeeService,
    private router: Router,
    private authService: SocialAuthService,
    private sessionService: SessionService
  ) {
    // this.mediaMatcher.addListener((mql) =>
    //   zone.run(
    //     () =>
    //       (this.mediaMatcher = matchMedia(
    //         `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    //       ))
    //   )
    // );
  }

  ngOnInit() {
    this.socialUser = this.sessionService.getUser();
    if (this.socialUser) {
      this.isLoggedin = this.socialUser ? true : false;
      this.userName = this.socialUser.firstName;
      this.photoUrl = this.socialUser.photoUrl;
    }
  }

  isScreenSmall(): boolean {
    return false;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  logOut(): void {
    this.authService
      .signOut()
      .then(() => {
        this.sessionService.removeUser();
        this.router.navigate(['']);
      })
      .catch(() => {
        this.sessionService.removeUser();
        this.router.navigate(['']);
      });
  }
}
