import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  taskForm = new FormGroup({

    description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    state: new FormControl('', [Validators.required])
  });
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {}

  addTask(): void{
    if(this.taskForm.invalid){
      return;
    }
    const description = this.taskForm.value.description;
    const state = this.taskForm.value.state;
    
    const task: any = {
      'description': description, 
      'state': state
    };

  this.taskService.addTask(task).subscribe(async data =>{
    this.router.navigateByUrl('/home');
  })
  }

  goBack(){
    this.router.navigateByUrl('/home');
  }

  get f() {
    return this.taskForm.controls;
  }
}
