import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

interface LocalUser {
  id: number;
  name: string;
  email: string;
  password: string;
  level: number;
  img: string;
}

@Component({
    standalone:true,
    selector: 'app-login',
    imports: [ReactiveFormsModule,RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginError:boolean=false
  form:FormGroup= this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],

  });

  /**
   * Login 100% local: no se llama al backend. Mismas credenciales que
   * database/seeders/UsersSeeder.php, para que coincidan con los datos ya sembrados.
   */
  private localUsers: LocalUser[] = [
    { id: 1, name: 'Administrador', email: 'admin@gmail.com', password: '452500', level: 1, img: 'default.jpg' },
    { id: 2, name: 'Repartidor 1', email: 'r1@gmail.com', password: '452500', level: 2, img: 'default.jpg' },
    { id: 3, name: 'Repartidor 2', email: 'r2@gmail.com', password: '452500', level: 2, img: 'default.jpg' },
  ];

  constructor(private fb:FormBuilder, private router:Router){}

  ngOnInit(): void {
    localStorage.removeItem('dpm_'+environment.location)
    localStorage.removeItem('dpm_'+environment.location+"_user")
  }

  login(): void {
    const { email, password } = this.form.value;
    const user = this.localUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      this.loginError = true;
      return;
    }

    const { password: _pwd, ...userData } = user;
    const token = this.buildLocalToken(userData);

    localStorage.setItem('dpm_'+environment.location, token);
    localStorage.setItem('dpm_'+environment.location+"_user", JSON.stringify(userData));

    const tokenInfo:any = this.getDecodedAccessToken(token);

    if(tokenInfo.level==1){
      this.router.navigate(['/admin']).then(() => {
        window.location.reload(); // Fuerza la recarga
      });
    }else if(tokenInfo.level == 2){
      this.router.navigate(['/admin/mis-rutas']).then(() => {
        window.location.reload(); // Fuerza la recarga
      });
    }else{
      this.router.navigate(['/']);
    }
  }

  /** Genera un JWT sin firmar (header.payload.), suficiente para que jwtDecode lo lea localmente. */
  private buildLocalToken(userData: Omit<LocalUser, 'password'>): string {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'none', typ: 'JWT' };
    const payload = { ...userData, iat: now, exp: now + 60 * 60 * 24 };
    return `${this.base64UrlEncode(header)}.${this.base64UrlEncode(payload)}.local`;
  }

  private base64UrlEncode(obj: unknown): string {
    const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}
