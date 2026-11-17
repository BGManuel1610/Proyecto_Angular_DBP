import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleVentasService {
  private readonly url = 'http://localhost:3000/api/v1/detalle_ventas';
  constructor(private http: HttpClient) {}
  getDetallesPorVenta(ventaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/venta/${ventaId}`);
  }
  getDetalleById(id: number): Observable<any> { return this.http.get<any>(`${this.url}/${id}`); }
}
