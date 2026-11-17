
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {

  private readonly url = 'http://localhost:3000/api/v1/proveedores';

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  public getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  // Obtener un proveedor por ID
  getProveedorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Crear un proveedor
  crearProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(this.url, proveedor);
  }

  // Actualizar completamente un proveedor
  actualizarProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, proveedor);
  }

  // Actualizar parcialmente un proveedor
  actualizarParcialProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, proveedor);
  }

  // Eliminar un proveedor
  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
