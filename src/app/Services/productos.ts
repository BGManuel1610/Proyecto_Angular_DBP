import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly url = 'http://localhost:3000/api/v1/productos';
  constructor(private http: HttpClient) {}
  getProductos(): Observable<any[]> { return this.http.get<any[]>(this.url); }
  getProductoById(id: number): Observable<any> { return this.http.get<any>(`${this.url}/${id}`); }
  crearProducto(data: any): Observable<any> { return this.http.post<any>(this.url, data); }
  actualizarProducto(id: number, data: any): Observable<any> { return this.http.put<any>(`${this.url}/${id}`, data); }
  eliminarProducto(id: number): Observable<any> { return this.http.delete<any>(`${this.url}/${id}`); }
}
