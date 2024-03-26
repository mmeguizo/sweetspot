import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { FormGroupDirective } from '@angular/forms';
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [UsersComponent],
  providers: [FormGroupDirective],
})
export class UsersModule {}
