import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from '../services/maintenance.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { NotificationService } from '../services/notification.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  public loading: boolean = false;
  private data: [] = [];

  displayedColumns: string[] = [
    'ID',
    'unitNumber',
    'name',
    'email',
    'serviceType',
    'summary',
    'details',
    'options',
  ];
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  private getSubscription = new Subject<void>();

  constructor(
    public maintenance: MaintenanceService,
    public notify: NotificationService
  ) {
   this.getAllMaintenance();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  private paginator!: MatPaginator;

  @ViewChild(MatPaginator, { static: true }) set matPaginator(
    paginator: MatPaginator | undefined
  ) {
    if (paginator) {
      this.paginator = paginator;
      this.dataSource.paginator = this.paginator;
    }
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /** Announce the change in sort state for assistive technology. */

  getAllMaintenance() {
    this.loading = true;
    this.maintenance
      .getAllMaintenance()
      .pipe(takeUntil(this.getSubscription))
      .subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.loading = false;
          this.dataSource.data = data.data;
        } else {
          this.loading = false;
          this.notify.notification$.next(data.message);
        }
      });
  }
}
