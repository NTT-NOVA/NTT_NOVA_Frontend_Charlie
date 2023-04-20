import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Tasks } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  headers:HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'api-key': environment.apiKey
      })
   }

  getAll(): Observable<Tasks[]>{

  const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'api-key': environment.apiKey
      })}

    return this.http.get<Tasks[]>(environment.API, httpOptions);
  }

  getTaskById(id:number): Observable<any>{
    return this.http.get<Tasks>(environment.API+id,{headers:this.headers});
  }

  modifyTask(updatedTask: Tasks, id: number): Observable<any>{
    const options= {headers:this.headers};
    return this.http.put(environment.API+ id, updatedTask,{headers:this.headers});
  }

  addTask(newTask: Tasks): Observable<any>{
    return this.http.post(environment.API, newTask,{headers:this.headers});
  }

  deleteTask(id: any): Observable<any>{
    return this.http.delete(environment.API +id,{headers:this.headers});
  }
}
