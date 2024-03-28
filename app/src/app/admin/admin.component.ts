import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from '../services/maintenance.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../components/confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'number',
    'unitNumber',
    'name',
    'email',
    'serviceType',
    'summary',
    'details',
    'options',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Initialize your data source

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public loading: boolean = false;
  private getSubscription = new Subject<void>();
  private firstTime = true;
  public data: any;
  constructor(
    public maintenance: MaintenanceService,
    public notify: NotificationService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    if(this.firstTime){
      this.getAllMaintenance();
      this.firstTime = false;
    }
  }

  getAllMaintenance() {
    this.loading = true;
    this.maintenance
      .getAllMaintenances()
      .pipe(takeUntil(this.getSubscription))
      .subscribe((data: any) => {
        if (data.success) {
          this.loading = false;
          if (this.data) {
            const temp: any[] = [];
            data.data.forEach((item: any) => {
              const found = this.dataSource.data.find((x) => x.id === item.id);
              if (!found) {
                temp.push(item);
              } else {
                this.data = this.data.filter((x: any) => x.id !== item.id);
              }
            });
            this.dataSource.data = [...this.dataSource.data, ...temp];
          } else {
            this.dataSource.data = this.data = data.data;
          }
        } else {
          this.loading = false;
          this.notify.notification$.next(data.message);
        }
      });
  }

  editEntry(id: string) {
  }
  deleteEntry(id: string, name: string) {
    this.openConfirmationDialog(id, name);
  }

  openConfirmationDialog(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data: {
        message: `Are you sure you want to delete this request from ${name} ?`,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('said yes');
        this.loading = true;
        this.maintenance
          .closeMaintenance(id)
          .pipe(takeUntil(this.getSubscription))
          .subscribe((data: any) => {
            if (data.success) {
              this.dataSource.data = this.dataSource.data.filter(
                (item) => item._id !== id
              );
              this.loading = false;
              this.notify.notification$.next(data.message);
            } else {
              this.notify.notification$.next(data.message);
            }
            this.loading = false;
          });
      } else {
        console.log('said no');
      }
    });
  }
}
