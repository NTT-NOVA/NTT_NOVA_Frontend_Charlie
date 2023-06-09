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
  filteredTasks: Tasks[] = [];
	backupTasks: Tasks[] = [];

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks= [];
   }
  ngOnInit(): void {
    this.taskService.getAll().subscribe( data =>{
      this.tasks = data;
			this.backupTasks = this.tasks;
    })
  }

  delete(id: number){
    this.taskService.deleteTask(id).subscribe(async data =>{
      window.location.reload();
    })
  }

  edit(id: number){
    this.router.navigate(['edit/' + id]);
  }

  filterTasks(state: number) {
		this.filteredTasks = this.backupTasks.filter(tasks =>
			tasks.state == state);
		this.tasks = this.filteredTasks;
  }

	showAll() {
		this.tasks = this.backupTasks;
	}
}
