import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private router: Router,
    private userService: UserService
    ) {
      this.form = fb.group({
        email: [""],
        phone: [""],
        name: [""],
      });
     }

  ngOnInit(): void {
    console.log('RegistrationScreenComponent')
  }

  createUser(): void{
    
    const {name,email,phone} = this.form.value
    const user: User ={
      email:email,
      name:name,
      phone:phone,
      userId:"",
      createdAt: (new Date()).toLocaleString(),
      roleId:1,
      icon: 'svg-1'
    }
    this.userService.createNewUserManager(user).then(res=>{
      console.log(res)
      if(res && res.userId){
        this.userService.createUserIntegration(res.userId).then(res=>{
          console.log("Integração gerada com sucesso!")
          alert("Acesso Criado Com sucesso")
          this.router.navigate(['/login'])
        }).catch(err=>{
          console.log("Erro na geração da integração!")
        })
      }
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
