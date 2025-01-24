import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  imports: [CommonModule, RouterModule],
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
        console.log('Datos recibidos:', data); // Verifica el contenido de los datos
        if (data && Array.isArray(data.data)) {
          this.vehiculos = data.data; // Asignar solo si es un array válido
        } else {
          this.vehiculos = []; // Asegurar que sea un array, incluso si no se reciben datos válidos
        }
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