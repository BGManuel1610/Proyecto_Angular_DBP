
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentasService {

  private readonly url = 'http://localhost:3000/api/v1/ventas';

  constructor(private http: HttpClient) {}

  // Obtener todas las ventas
  public getVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  // Obtener una venta por ID
  getVentaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Crear una venta
  crearVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.url, venta);
  }

  // Actualizar completamente una venta
  actualizarVenta(id: number, venta: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, venta);
  }

  // Actualizar parcialmente una venta
  actualizarParcialVenta(id: number, venta: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, venta);
  }

  // Eliminar una venta
  eliminarVenta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}

