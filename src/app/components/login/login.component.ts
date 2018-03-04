import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  email:string;
  password: string;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit() {
    this.message = 'Estado de la peticion.';
  }

  login(){
    this.auth.login(this.email, this.password).subscribe(
      (response) =>{
        if(response){
          console.log(localStorage.getItem('currentUser'));
          this.router.navigate(['']);
        }
        else{
          this.message = 'Usuario y contraseña no coinciden.';
        }
      },
      error =>{
        console.log(error);
      }
    );

    return false;
  }
}
