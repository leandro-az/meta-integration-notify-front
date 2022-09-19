import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-screen',
  templateUrl: './registration-screen.component.html',
  styleUrls: ['./registration-screen.component.scss']
})
export class RegistrationScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('RegistrationScreenComponent')
  }

}
