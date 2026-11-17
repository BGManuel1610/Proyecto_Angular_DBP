import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VentasService } from '../../Services/ventas';
import { Table } from '../../Components/table/table';

@Component({
  selector: 'app-ventas',
  imports: [Table],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas implements OnInit {
  data: any[] = [];

  constructor(private ventasService: VentasService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ventasService.getVentas().subscribe((rows: any[]) => {
      this.data = rows;
      this.cdr.detectChanges();
    });
  }
}



