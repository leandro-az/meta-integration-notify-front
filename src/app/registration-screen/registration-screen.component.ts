import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.scss']
})
export class RegistrationScreenComponent implements OnInit {
  defaultCredicard="XXXXX XXXX XXXXX XXXXX"
  email=""
  name=""
  phone=""

  socialUser?: SocialUser | null;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    console.log('RegistrationScreenComponent')
  }

  createUser(): void{
    const user: User ={
      email:this.email,
      name:this.name,
      phone:this.phone,
      userId:"",
      createdAt: new Date(),
      roleId:1,
    }
    this.userService.createNewUserManager(user).then(res=>{
      console.log(res)
      alert("Acesso Criado Com sucesso")
      this.router.navigate(['/login'])
    }).catch(err=>{
      console.log(err)
      alert("Erro ao criar acesso")
    })
    ;
  }

  redirectToLoging():void{
    this.router.navigate(['/login']);
  }

}
