import { Component, OnInit, NgZone } from '@angular/core';
// import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';

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
  socialUser!: SocialUser;
  constructor(
    zone: NgZone,
    // private employeeService: EmployeeService,
    private router: Router,
    private authService: SocialAuthService
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
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  isScreenSmall(): boolean {
    return false;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  logOut(): void {
    this.authService.signOut().then(() => this.router.navigate(['']));
  }
}
