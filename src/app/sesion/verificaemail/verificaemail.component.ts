import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-verificaemail',
  templateUrl: './verificaemail.component.html',
  styleUrls: ['./verificaemail.component.css']
})
export class VerificaemailComponent implements OnDestroy{
  public user$: Observable<any> = this.authSvc.auth.user;
  constructor(private authSvc: AuthService) {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.authSvc.logout();
  }
  
}

