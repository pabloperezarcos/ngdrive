import { Component } from '@angular/core';

@Component({
  selector: 'app-vehiculos',
  imports: [],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss'
})
export class VehiculosComponent {

  vehiculos = [
    { id: 1, patente: 'JGDS-22', marca: 'PEUGEOT', modelo: 'BOXER HDI', anno: 2017, estado: 'Operativa' },
    { id: 2, patente: 'CVHT-74', marca: 'MITSUBISHI', modelo: 'L300', anno: 2011, estado: 'En Mantenimiento' },
    { id: 3, patente: 'HGTS-15', marca: 'PEUGEOT', modelo: 'BOXER HDI', anno: 2017, estado: 'Dada de Baja' },
  ];

}
