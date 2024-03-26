import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ALL_SERVICE_TYPES } from '../../lib/api-interfaces';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective
} from '@angular/forms';
import { MaintenanceService } from '../services/maintenance.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  private getSubscription = new Subject<void>();
  

  public form!: FormGroup;

  @ViewChild(FormGroupDirective) 
  private formDirective!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    public maintenance: MaintenanceService,
    public notify: NotificationService,
  ) {
    this.createForm();
  }
  ngOnInit(): void {
   
  }

  noWhitespaceValidator(control: FormControl) {
    return (control.value || '').toString().trim().length ? null : { whitespace: true };
  }

 

  createForm() {
    this.form = this.formBuilder.group({
      unitNumber: ['', [Validators.required, this.noWhitespaceValidator]],
      name: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      summary: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.noWhitespaceValidator,
        ],
      ],
      details: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.noWhitespaceValidator,
        ],
      ],
    });
  }

  executeAction() {
    this.maintenance
      .addMaintenance(this.form.value)
      .pipe(takeUntil(this.getSubscription))
      .subscribe((data: any) => {
        if (data.success) {
          // this.form.reset();
          this.formDirective.resetForm()
          this.notify.notification$.next(data.message);
        } else {
          this.notify.notification$.next(data.message);
        }
      });
  }

  ngOnDestroy() {
    this.getSubscription.next();
    this.getSubscription.complete();
  }
}
