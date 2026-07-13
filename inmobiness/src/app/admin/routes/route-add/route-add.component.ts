import { Component, OnInit } from '@angular/core';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { RoutesService } from '../../services/routes/routes.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { environment } from '../../../../environments/environment';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-route-add',
  imports: [
    PreloaderComponent,
    Button,
    TableModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    DatePipe,
    CurrencyPipe,
    SelectModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './route-add.component.html',
  styleUrl: './route-add.component.scss',
})
export class RouteAddComponent implements OnInit {
  loaded: boolean = false;
  constructor(
    private rs: RoutesService,
    private ms: MessagesService,
    private fb: FormBuilder
  ) {}
  data: any = [];
  users: any = [];

  form: FormGroup = this.fb.group({
    start_date: ['', [Validators.required, Validators.maxLength(255)]],
    end_date: ['', [Validators.required, Validators.maxLength(50)]],
    data: [[]],
    users: [[]],
  });
  completed: number = 0;
  userImg = environment.appUrl + 'users/';
  ngOnInit(): void {
    this.form.controls['start_date'].setValue(new Date());
    this.refresh();
  }
  refresh() {
    this.loaded=false
    let date: Date = new Date(this.form.value.start_date);
    this.rs
      .getData({
        start_date:
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate(),
      })
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.packages;
        this.users = res.users;

        this.data.forEach((element: any) => {
          Object.assign(element, { user: null });
        });
        this.users.forEach((element: any) => {
          Object.assign(element, { total: 0, packages: [] });
        });
        this.completed = 0;
        this.loaded = true;
      });
  }
  updateRoute() {
    let date: Date = new Date(this.form.value.start_date);
    if (this.completed == 0) {
      this.refresh()
    } else {
      this.ms
        .showConfirmation('¿Está seguro de querer consultar los paquetes de la fecha sin haber guardado la ruta?')
        .then((confirm: any) => {
          if (confirm) {
            this.refresh()
            
          }
        });
    }
  }
  refreshCompleted(value: any, index: any) {
    this.users.forEach((element: any) => {
      element.total = 0;
      element.packages = [];
    });

    this.completed = 0;
    this.data.forEach((element: any) => {
      if (element.user != null) {
        this.completed++;
        this.users.forEach((user: any) => {
          if (user.id == element.user.id) {
            user.total += element.price;
            user.packages.push(element);
          }
        });
      }
    });
    this.form.controls['data'].setValue(this.data);
    this.form.controls['users'].setValue(this.users);
  }
  saveRoute() {
    this.loaded = false;
    let date: Date = new Date(this.form.value.start_date);
    console.log(date);
    let users: any = [];
    let packages: any = [];
    this.users.forEach((element: any) => {
      users.push({ id: element.id, total: element.total });
    });
    this.data.forEach((element: any) => {
      if (element.user != null) {
        packages.push({ id: element.id, id_user: element.user.id });
      }
    });
    let data: any = {
      start_date:
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      data: packages,
      users: users,
    };
    console.log(data);
    this.rs.saveRoute(data).subscribe(
      (res: any) => {
        console.log(res);
        this.ms.showSuccess('Ruta guardada correctamente');
        this.loaded = true;
        this.refresh();
      },
      (err: any) => {
        console.log(err);
        this.ms.showError('No se pudo guardar la ruta');
      }
    );
  }
}
