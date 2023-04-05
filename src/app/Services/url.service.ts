import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urlService: string = 'https://localhost:44337';
  constructor() { }
}
