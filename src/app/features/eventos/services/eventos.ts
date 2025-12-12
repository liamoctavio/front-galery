import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Evento {
  id: number;
  titulo: string;
  tipo: string; // 'Taller' | 'Conferencia' | 'Exposición' | etc.
  fecha: Date;
  hora: string;
  precio: number;
  ubicacion: string;
  lat: number; 
  lng: number; 
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})


export class Eventos {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/eventos`; // http://localhost:8080/bff/eventos

  // --- MÉTODO AUXILIAR PARA OBTENER HEADERS Y DEPURAR ---
  // private getHeaders() {
  //   const token = localStorage.getItem('token'); // Asegúrate que 'token' es la clave correcta en tu localStorage

  //   // TU CÓDIGO DE DEPURACIÓN
  //   console.log("---- DEBUG TOKEN (Desde Servicio Eventos) ----");
  //   console.log("Valor del token en Storage:", token);
  //   const authHeader = `Bearer ${token}`;
  //   console.log("Header que se enviará:", authHeader);

  //   return new HttpHeaders({
  //     'Authorization': authHeader
  //   });
  // }

  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token'); // O la clave que uses
  if (!token) {
      console.warn('⚠️ No hay token en localStorage, la petición fallará');
      return new HttpHeaders();
  }
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

  obtenerEventos() {
    // return this.http.get<any[]>(this.apiUrl);
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }


  crearEvento(evento: any) {
    return this.http.post(this.apiUrl, evento);
  }

  // Editar
  editarEvento(id: number, evento: any) {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar
  // eliminarEvento(id: number) {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
  eliminarEvento(id: number, idAzure: string) { // <--- Agregamos idAzure
    return this.http.delete(`${this.apiUrl}/eventos/${id}?id_azure=${idAzure}`);
  }

  
}
