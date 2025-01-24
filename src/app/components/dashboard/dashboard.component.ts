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
import { RouterModule } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalVehiculos: number = 0;
  public chartData: any;
  public chartOptions: any;

  constructor(private vehiculosService: VehiculosService) {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);
  }

  ngOnInit(): void {
    // Configuración de datos para el gráfico
    this.cargarTotalVehiculos();
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
      ]
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

  cargarTotalVehiculos(): void {
    this.vehiculosService.getTotalVehiculos().subscribe({
      next: (response) => {
        if (response.success) {
          this.totalVehiculos = response.total;
        } else {
          console.error('Error al obtener el total de vehículos:', response.message);
        }
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
      },
    });
  }






}