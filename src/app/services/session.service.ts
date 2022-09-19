import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  /**
   * name
   */
  public putUser(socialUser: SocialUser) {
    sessionStorage.setItem('user', JSON.stringify(socialUser));
  }
  public getUser(): SocialUser | null {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr) as SocialUser;
    return null;
  }
  public isLogged(): boolean {
    return sessionStorage.getItem('user') ? true : false;
  }
  public removeUser() {
    sessionStorage.removeItem('user');
  }

  public putToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return sessionStorage.getItem('token')
  }
  public clearAllInfos(){
    sessionStorage.clear()
  }
}
