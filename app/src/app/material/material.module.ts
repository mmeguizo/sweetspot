import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class MaterialModule {}
