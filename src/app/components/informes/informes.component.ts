import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-informes',
  imports: [CommonModule
    //RouterLink
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss'
})
export class InformesComponent {

  informeId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.informeId = this.route.snapshot.paramMap.get('informeId');
  }





}

