import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Chart } from 'chart.js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartData: any;
  public chartOptions: any;

  constructor() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);
  }

  ngOnInit(): void {
    // Configuración de datos para el gráfico
    this.chartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Consumo (L)',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          fill: true,
        },
      ],
    };

    // Configuración de opciones para el gráfico
    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Consumo de Combustible',
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  }
}