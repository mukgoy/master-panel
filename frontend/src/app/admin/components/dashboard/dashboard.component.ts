import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  newLeads:any
  newUsers:any
  newVisitors:any
  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
    this.getLeadCount()
    this.getUserCount()
    this.getVisitorCount()
  }

  getLeadCount() {
    this.reportService.getLeadCount()
    .subscribe((res: any) => {
      this.newLeads = res;
    });
  }
  getUserCount() {
    this.reportService.getUserCount()
    .subscribe((res: any) => {
      this.newUsers = res;
    });
  }
  getVisitorCount() {
    this.reportService.getVisitorCount()
    .subscribe((res: any) => {
      this.newVisitors = res;
    });
  }
}
