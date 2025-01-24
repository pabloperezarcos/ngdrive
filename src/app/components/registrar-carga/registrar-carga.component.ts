import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registrar-carga',
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-carga.component.html',
  styleUrl: './registrar-carga.component.scss'
})
export class RegistrarCargaComponent implements OnInit {
  vehiculos: any[] = [];
  kilometrajeActualDisplay: string = '';

  carga: any = {
    vehiculo_id: null,
    tipo_combustible: '',
    litros_cargados: null,
    costo_por_litro: null,
    costo_total: null,
    kilometraje_actual: null,
    kilometraje_anterior: null,
    rendimiento: null,
    fecha_carga: new Date().toISOString().split('T')[0], // Fecha actual
  };


  constructor(private vehiculosService: VehiculosService, private router: Router) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculosService.getVehiculos().subscribe({
      next: (response) => {
        this.vehiculos = response.data || [];
      },
      error: (error) => {
        console.error('Error al cargar los vehículos:', error);
      },
    });
  }

  calcularCostoTotal(): void {
    if (this.carga.litros_cargados && this.carga.costo_por_litro) {
      // Calcular el costo total y redondear al número entero más cercano
      this.carga.costo_total = Math.round(this.carga.litros_cargados * this.carga.costo_por_litro);
    }
  }

  registrarCarga(): void {
    // Validación básica
    if (!this.carga.vehiculo_id || !this.carga.tipo_combustible || !this.carga.litros_cargados) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Llamar al servicio para guardar la carga
    this.vehiculosService.registrarCarga(this.carga).subscribe({
      next: () => {
        alert('Carga registrada exitosamente');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al registrar la carga:', error);
        alert('Hubo un error al registrar la carga.');
      },
    });
  }

  validarLitros(): void {
    if (this.carga.litros_cargados < 0) {
      this.carga.litros_cargados = 0;
    }

    // Limitar a 2 decimales
    if (this.carga.litros_cargados) {
      this.carga.litros_cargados = parseFloat(this.carga.litros_cargados.toFixed(2));
    }
  }

  validarKilometraje(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.replace(/\./g, ''); // Eliminar puntos antes de validar
    const valorNumerico = parseInt(valor, 10);

    // Permitir solo valores positivos
    if (valorNumerico >= 0 || !valor) {
      this.kilometrajeActualDisplay = valor;
      this.carga.kilometraje_actual = valorNumerico || null; // Actualizar el valor original sin formato
    } else {
      this.kilometrajeActualDisplay = '';
      this.carga.kilometraje_actual = null;
    }
  }

  formatearKilometraje(): void {
    if (this.carga.kilometraje_actual !== null && this.carga.kilometraje_actual >= 0) {
      this.kilometrajeActualDisplay = this.carga.kilometraje_actual
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  obtenerKilometrajeAnterior(): void {
    if (this.carga.vehiculo_id) {
      this.vehiculosService.getKilometrajeAnterior(this.carga.vehiculo_id).subscribe({
        next: (response) => {
          if (response.success) {
            this.carga.kilometraje_anterior = response.kilometraje_anterior || 0;
            if (this.carga.kilometraje_anterior === 0) {
              console.log('Primera recarga para este vehículo.');
            }
          } else {
            this.carga.kilometraje_anterior = 0; // Manejo predeterminado
          }
        },
        error: (error) => {
          console.error('Error al obtener el kilometraje anterior:', error);
          this.carga.kilometraje_anterior = 0;
        },
      });
    }
  }


  calcularRendimiento(): void {
    if (this.carga.kilometraje_anterior === 0) {
      this.carga.rendimiento = null; // No se calcula rendimiento en la primera recarga
      console.warn('No se puede calcular el rendimiento en la primera recarga.');
      return;
    }

    if (
      this.carga.kilometraje_actual &&
      this.carga.kilometraje_anterior &&
      this.carga.litros_cargados > 0) {
      const distancia = this.carga.kilometraje_actual - this.carga.kilometraje_anterior;
      this.carga.rendimiento = parseFloat((distancia / this.carga.litros_cargados).toFixed(2));
    } else {
      this.carga.rendimiento = null;
    }
  }

  calcularCostoPorLitro(): void {
    if (this.carga.litros_cargados > 0 && this.carga.costo_total > 0) {
      const costoPorLitro = this.carga.costo_total / this.carga.litros_cargados;
      this.carga.costo_por_litro = Math.round(costoPorLitro); // Redondear sin decimales
    } else {
      this.carga.costo_por_litro = 0; // Valor por defecto si los datos no son válidos
    }
  }





}