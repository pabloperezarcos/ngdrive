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
  cargasFiltradas: any[] = []; // Cargas luego de aplicar filtros
  cargasPaginadas: any[] = []; // Cargas que se muestran en la página actual

  vehiculos: any[] = [];         // Lista de vehículos
  vehiculoSeleccionado: number | null = null;  // ID o patente (según tus datos) del vehículo seleccionado

  // ---- Filtros de mes y año ----
  // Por defecto, el mes y año actuales
  selectedMonth: number = new Date().getMonth() + 1;  // Enero es 0, por eso +1
  selectedYear: number = new Date().getFullYear();

  // Listas de meses y años para los select
  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ];

  // Puedes generar dinámicamente años o poner un rango manual
  years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

  // ---- Paginación ----
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 1;

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

  obtenerCargas(): void {
    this.cargasService.obtenerCargas().subscribe({
      next: (data) => {
        this.cargas = data || [];
        // Al obtenerlas, aplicamos el filtro inicial por mes/año y vehículo
        this.filtrarCargas();
      },
      error: (err) => console.error('Error al obtener las cargas:', err),
    });
  }

  // ====================================================
  //   FILTROS
  // ====================================================
  // Filtra las cargas según vehículo, mes y año
  filtrarCargas(): void {
    // 1. Partimos de la lista original de cargas
    let filtered = [...this.cargas];

    // 2. Filtro por vehículo (si se seleccionó alguno)
    if (this.vehiculoSeleccionado !== null) {
      filtered = filtered.filter(
        (carga) => carga.vehiculo === this.vehiculoSeleccionado
      );
    }

    // 3. Filtro por mes y año
    //    Aquí asumo que `carga.fecha_carga` es una fecha válida que se pueda
    //    transformar en un Date (p.e. 2023-01-15T00:00:00 o similar)
    filtered = filtered.filter((carga) => {
      const fecha = new Date(carga.fecha_carga);
      const month = fecha.getMonth() + 1; // Enero = 0
      const year = fecha.getFullYear();

      return month === this.selectedMonth && year === this.selectedYear;
    });

    // 4. Asigno el resultado a cargasFiltradas
    this.cargasFiltradas = filtered;

    // 5. Recalculo paginación y muestro página 1
    this.totalPages = Math.ceil(this.cargasFiltradas.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updateCargasPaginadas();
  }

  // ====================================================
  //   PAGINACIÓN
  // ====================================================
  updateCargasPaginadas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.cargasPaginadas = this.cargasFiltradas.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCargasPaginadas();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCargasPaginadas();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCargasPaginadas();
    }
  }
}