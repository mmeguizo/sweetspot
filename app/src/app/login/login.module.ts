import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, SharedModule, LoginRoutingModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}
