import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.nullValidator]],
    status: ['', [Validators.required, Validators.nullValidator]]
  });

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) { }

  ngOnInit() {}

  get formControls(){
    return this.taskForm.controls;
  }

  addTask(): void{
    if(this.taskForm.invalid){
      return;
    }
    const description = this.taskForm.value.description;
    const status = this.taskForm.value.status;
    
    const task: any = {
      'description': description, 
      'status': status
    };

  this.taskService.addTask(task).subscribe(async data =>{
    this.router.navigateByUrl('/home');
  })
  }

  goBack(){
    this.router.navigateByUrl('/home');
  }
}