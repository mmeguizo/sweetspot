import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AdminComponent, UsersComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports: [MaterialModule],
})
export class AppModule {}
