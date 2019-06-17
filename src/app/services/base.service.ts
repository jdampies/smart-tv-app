import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// NOTE: Made use of alternative to cors.io listed below because heroku server goes down periodically.
// https://cors.io/?https://api.behance.net/v2/fields? becomes
// https://cors-anywhere.herokuapp.com/https://api.behance.net/v2/fields?

export const API_URLS = {
  fetchBehanceFields: 'https://cors.io/?https://api.behance.net/v2/fields?',
  fetchBehanceProjects: 'https://cors.io/?https://api.behance.net/v2/projects?',
}

let headers = new HttpHeaders({
  'Accept': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http:HttpClient) { }

  getFields(client_id:string) {
    return this.http.get(
      API_URLS.fetchBehanceFields + 'client_id=' + client_id, { headers: headers }
    );
  }

  getProjects(client_id:string, field: string) {
    return this.http.get(
      API_URLS.fetchBehanceProjects + 'client_id=' + client_id + '&field=' + field, { headers: headers }
    );
  }
}
