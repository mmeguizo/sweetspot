import { Component, OnInit, ViewChild, viewChild } from '@angular/core';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private getSubscription = new Subject<void>();

  public loading: Boolean = false;
  public notLoading: Boolean = false;
  public form!: FormGroup;

  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    public notify: NotificationService,
    private router: Router,
    private auth: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // this.getAllMaintenance();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  executeAction() {
    this.auth
      .login(this.form.value)
      .pipe(takeUntil(this.getSubscription))
      .subscribe((data: any) => {
        this.loading = true;
        if (data.success) {
          // this.form.reset();
          // this.formDirective.resetForm()
          // let decoded = jwt_decode.verify(data.token, data.secret);
          this.loading = false;
          this.notLoading = true;
          this.auth.storeUserData(data.token);
          console.log(data);
         
          if (this.auth.AuthGuard()) {
            this.router.navigate(['admin']);
          } else {
            this.auth.logout();
            this.router.navigate(['']);
          }
          this.notify.notification$.next(data.message);
        } else {
          this.loading = false;
          this.notLoading = true;
          this.notify.notification$.next(data.message);
        }
        this.loading = false;
      });

    // this.notify.notification$.next('Login Successful');
    // setTimeout(() => {
    //   this.router.navigate(['admin'])
    // }, 1000);
  }

  ngOnDestroy() {
    this.getSubscription.next();
    this.getSubscription.complete();
  }
}
