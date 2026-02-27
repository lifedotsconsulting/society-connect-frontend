import { Component, inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, UserRole } from '../models/core.models';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  currentUser: User | null = null;
  roleEnum = UserRole;
  selectedTab = 'events';
  selectedMaintenanceTab = 'updates';
  maintenanceFilter = 'monthly';

  // Mock data for views
  members = [
    { username: 'A101', name: 'John Admin', role: 'Admin', phone: '1234567890' },
    { username: 'B403', name: 'Jane Owner', role: 'FlatOwner', phone: '0987654321' },
    { username: 'C202', name: 'Bob Chairman', role: 'Chairman', phone: '1122334455' }
  ];

  events = [
    { title: 'Annual General Meeting', date: '2024-03-15', type: 'Society' },
    { title: 'Holi Celebration', date: '2024-03-25', type: 'Society' },
    { title: 'Jane Birthday Party', date: '2024-04-10', type: 'Personal' }
  ];

  dashboardEvents = [
    { title: 'Social Gathering', type: 'Society' },
    { title: 'Pooja @Flat 403', type: 'Personal' },
    { title: 'Ganesh Pujan @society', type: 'Society' },
    { title: 'Meeting - Sunday Mornin 10.30 AM', type: 'Society' }
  ];

  dashboardUpdates = [
    { title: 'Water tank cleaning scheduled', createdBy: 'Admin', createdOn: '2024-10-25' },
    { title: 'Lift maintenance completed', createdBy: 'Chairman', createdOn: '2024-10-24' },
    { title: 'New security guard hired', createdBy: 'Admin', createdOn: '2024-10-20' }
  ];

  dashboardObligations = [
    { title: 'Pending Maintenance', amount: 2500, dueDate: '2024-11-05' },
    { title: 'Celebration Contribution', amount: 500, dueDate: '2024-10-31' }
  ];

  complaints = [
    { title: 'Lift not working', status: 'In Progress', date: '2024-02-20' },
    { title: 'Water leakage in parking', status: 'Open', date: '2024-02-25' }
  ];

  vehicles = [
    { reg: 'MH12 AB1234', type: 'Car' },
    { reg: 'MH12 XY9876', type: 'Bike' }
  ];

  pendingMembers = [
    { name: 'John Doe', flat: 'A101', amount: 1500, period: 'Current Month' },
    { name: 'Jane Smith', flat: 'B205', amount: 2500, period: 'Last Month' },
    { name: 'Bob Johnson', flat: 'C302', amount: 1500, period: 'Current Month' },
  ];

  paidMembers = [
    { name: 'Alice Brown', flat: 'A102', amount: 1500, date: '2024-10-05' },
    { name: 'Charlie Davis', flat: 'B201', amount: 1500, date: '2024-10-02' }
  ];

  pieChart: any;
  barChart: any;
  dashboardPieChart: any;
  dashboardBarChart: any;

  get totalPendingAmount() {
    return this.pendingMembers.reduce((sum, member) => sum + member.amount, 0);
  }

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.authService.currentUser$.subscribe(u => this.currentUser = u);

    if (this.folder.toLowerCase() === 'maintenance') {
      this.renderCharts();
    }
    if (this.folder.toLowerCase() === 'dashboard') {
      this.renderDashboardCharts();
    }
  }

  onMaintenanceTabChange() {
    if (this.selectedMaintenanceTab === 'updates') {
      this.renderCharts();
    }
  }

  renderDashboardCharts() {
    setTimeout(() => {
      const pieCtx = document.getElementById('dashboardPieCanvas') as HTMLCanvasElement;
      const barCtx = document.getElementById('dashboardBarCanvas') as HTMLCanvasElement;

      if (pieCtx) {
        if (this.dashboardPieChart) this.dashboardPieChart.destroy();
        this.dashboardPieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Members', 'Tenants', 'Committee'],
            datasets: [{
              data: [45, 20, 10],
              backgroundColor: ['#3880ff', '#5260ff', '#2dd36f']
            }]
          }
        });
      }

      if (barCtx) {
        if (this.dashboardBarChart) this.dashboardBarChart.destroy();
        this.dashboardBarChart = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
              label: 'General Activity',
              data: [12, 19, 3, 5],
              backgroundColor: '#eb445a'
            }]
          }
        });
      }
    }, 200);
  }

  renderCharts() {
    setTimeout(() => {
      const pieCtx = document.getElementById('maintenancePieCanvas') as HTMLCanvasElement;
      const barCtx = document.getElementById('maintenanceBarCanvas') as HTMLCanvasElement;

      if (pieCtx) {
        if (this.pieChart) this.pieChart.destroy();
        this.pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: ['Paid', 'Pending'],
            datasets: [{
              data: [60, 40],
              backgroundColor: ['#2dd36f', '#eb445a']
            }]
          }
        });
      }

      if (barCtx) {
        if (this.barChart) this.barChart.destroy();
        this.barChart = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
              label: 'Collections',
              data: [15000, 20000, 5000, 10000],
              backgroundColor: '#3880ff'
            }]
          }
        });
      }
    }, 200);
  }
}
