import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss'
})
export class VehiculosComponent implements OnInit {
  vehiculos: any[] = [];

  constructor(private vehiculosService: VehiculosService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculosService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      },
      complete: () => {
        console.log('Carga de vehículos completada');
      },
    });

  }
}