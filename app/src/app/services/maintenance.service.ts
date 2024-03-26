import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaintenanceRequest } from '../../lib/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  public options: any;

  constructor(public cs: ConnectionService, private http: HttpClient) {}

  createHeaders() {
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  addMaintenance(data: MaintenanceRequest) {
    this.createHeaders();
    return this.http.post(
      this.cs.domain + '/maintenance/maintenance-requests',
      data,
      {
        headers: this.options,
      }
    );
  }

  getAllMaintenance() {
    this.createHeaders();
    return this.http.get(this.cs.domain + '/maintenance/getAllMaintenance/', {
      headers: this.options,
    });
  }
}


