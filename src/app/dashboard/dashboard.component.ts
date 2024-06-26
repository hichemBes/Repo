import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Chart,registerables  } from 'chart.js';



@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent  implements AfterViewInit ,OnDestroy {

  
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas: ElementRef;
  @ViewChild('educationChartCanvas') educationChartCanvas: ElementRef;
  @ViewChild('pieChartCanvas') pieChartCanvas: ElementRef;
  
  private chart: Chart;
  private barChart: Chart;
  private educationChart: Chart<"bar", number[], string>;
  private pieChart: Chart<"pie", number[], string>;
  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.initializeChart();
    this.initializeBarChart();
    // this.initializeEducationChart();
    this.initializePieChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.barChart) {
      this.barChart.destroy();
    }
  }

  private initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['janvier', 'Févrirer', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
        datasets: [{
          label: 'Series A',
          data: [10, 19, 18, 25, 33, 45, 10],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  private initializeBarChart(): void {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [' Session Ingénieur dévéloppment ', 'Session Ingénieur Réseau', 'Session Dévéloppeur Informatique'],
        datasets: [{
          label: 'Nombre de Candidats',
          data: [4, 15, 65, 20, 25],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de Candidats Pour Chaque Session'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Libelle session'
            }
          }
        }
      }
    });

  }



  private initializeEducationChart(): void {
    const ctx = this.educationChartCanvas.nativeElement.getContext('2d');
    this.educationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bachelor', 'Master', 'PhD'],
        datasets: [{
          label: 'Nombre de candidats par Niveau d\'etudes',
          data: [20, 35, 10], // Example data, replace with actual data
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de candidats par Niveau d\'etudes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Niveau d\'éduction '
            }
          }
        }
      }
    });
  }




  private initializePieChart(): void {
    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Master ','Licence', 'Bac +2 ','Bac'],
        datasets: [{
          label: 'Nombre de candidats',
          data: [30, 40, 30,55],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)','rgba(89, 112, 235, 0.2'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }]
      },
    });
  }


}
