import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "MhNb70F7wmUsLYWSz1iMGOsKJvdTPU9u";
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = []

  public results: Gif[] = [];

  
  get historial(): string[] {
    return [...this._historial]; 
  }
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  buscarGifs(query: string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
              .set('api_key', this.apiKey)
              .set('q', query)
              .set('limit', '12');
    
    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search?`,{params})
    .subscribe((answ) => {
      console.log(answ.data); 
      this.results = answ.data;
      localStorage.setItem('results', JSON.stringify(this.results));
      });
      
  }
}
