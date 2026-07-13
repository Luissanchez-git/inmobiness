import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/guards/auth.service";
import { Router } from '@angular/router';

@Component({
    standalone:true,
    selector: 'app-register',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      let dataToRegister = this.registerForm.value;
      if(typeof dataToRegister === 'object') {
        this.authService.register(dataToRegister).subscribe({
          next: (value:any) => {
                this.router.navigate(['/login']);
          },
          error: (e:any) => {console.error(e.message)}
        })
      }

      console.log('Formulario válido:', this.registerForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
