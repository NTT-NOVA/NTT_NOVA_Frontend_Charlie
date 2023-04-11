import { TaskService } from './../services/task.service';
import { Tasks } from './../models/task.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  tasks: Tasks[] = [];
  id:any;

  constructor(private taskService: TaskService, private router: Router) { }
  ngOnInit(): void {
    this.taskService.getAll().subscribe( data =>{
      this.tasks = data;
    })
  }

  delete(id: any){
    this.taskService.deleteTask(id).subscribe(async data =>{
      window.location.reload();
    })
  }

}
