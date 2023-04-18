import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Tasks } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]>{
    return this.http.get<Tasks[]>(environment.API);
  }

  getTaskById(id:number): Observable<any>{
    return this.http.get<Tasks>(environment.API+id);
  }

  modifyTask(updatedTask: Tasks, id: number): Observable<any>{
    return this.http.put(environment.API+ id, updatedTask);
  }

  addTask(newTask: Tasks): Observable<any>{
    return this.http.post(environment.API, newTask);
  }

  deleteTask(id: any): Observable<any>{
    return this.http.delete(environment.API +id);
  }
}
