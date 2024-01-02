declare var google: any;

import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:'98641197722-r7qdai0djp64jriq56h2rc0p4ffikh4r.apps.googleusercontent.com',
      callback:(resp:any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'),{
      theme:'filled_blue',
      size:'large',
      shape: 'rectangle',
      width:350,
    })
  }

  private decodeToken(token:string){
return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(resp :any){
    if(resp){
      // decode the token
      const payLoad = this.decodeToken(resp.credential);
      // store in session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      // navigator to home browser
      this.router.navigate(['browse']);
    }
  }
}
