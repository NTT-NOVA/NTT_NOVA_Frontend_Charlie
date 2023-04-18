import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})

export class TaskEditComponent implements OnInit{

  id:any;
  state:any;
  modificadoTaskForm!: FormGroup;
  resultado:any;
	constructor(private formBuilder: FormBuilder, private taskService: TaskService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(this.id).subscribe(data =>{
      this.resultado = data;
      this.state=this.resultado.state
      this.modificadoTaskForm = new FormGroup({

      description: new FormControl(this.resultado.description, [Validators.required, Validators.maxLength(256)]),
      state: new FormControl(this.resultado.state, [Validators.required])
    });
    })
  }

  get f() {
    return this.modificadoTaskForm.controls;
  }

  modifyTask(): void{
    if(this.modificadoTaskForm.invalid){
      return;
    }
    const description = this.modificadoTaskForm.value.description;
    const state = this.modificadoTaskForm.value.state;
    
    const task: any = {
      'description': description, 
      'state': state
    };

  this.taskService.modifyTask(task,this.id).subscribe(async data =>{
    this.router.navigateByUrl('/home');
  })
  }

  goBack(){
    this.router.navigateByUrl('/home');
  }
}
