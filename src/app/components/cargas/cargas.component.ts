import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculosService } from '../../services/vehiculos.service';
import { CargasService } from '../../services/cargas.service';

@Component({
  selector: 'app-cargas',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cargas.component.html',
  styleUrl: './cargas.component.scss'
})
export class CargasComponent implements OnInit {
  cargas: any[] = []; // Todas las cargas
  cargasFiltradas: any[] = []; // Cargas filtradas
  vehiculos: any[] = []; // Lista de vehículos
  vehiculoSeleccionado: number | null = null; // ID del vehículo seleccionado

  constructor(private cargasService: CargasService, private vehiculosService: VehiculosService) { }

  ngOnInit(): void {
    this.getVehiculos();
    this.obtenerCargas();
  }

  // Obtiene la lista de vehículos para el filtro
  getVehiculos(): void {
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

  // Obtiene todas las cargas de combustible
  obtenerCargas(): void {
    this.cargasService.obtenerCargas().subscribe({
      next: (data) => {
        console.log('Cargas recibidas:', data); // Asegúrate de ver el formato de los datos
        this.cargas = data;
        this.cargasFiltradas = data; // Inicialmente muestra todas las cargas
      },
      error: (err) => {
        console.error('Error al obtener las cargas:', err);
      }
    });

  }

  // Filtra las cargas según el vehículo seleccionado
  filtrarCargas(): void {
    if (this.vehiculoSeleccionado) {
      // Filtra las cargas donde la patente coincida con el vehículo seleccionado
      this.cargasFiltradas = this.cargas.filter(
        (carga) => carga.vehiculo === this.vehiculoSeleccionado
      );
    } else {
      // Muestra todas las cargas si no hay filtro
      this.cargasFiltradas = this.cargas;
    }
  }

}
