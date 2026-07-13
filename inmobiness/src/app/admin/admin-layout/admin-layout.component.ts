import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../layouts/header/header.component';

@Component({
    standalone:true,
    selector: 'app-admin-layout',
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
