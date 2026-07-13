import { Component } from '@angular/core';
import { HeaderComponent } from "../layouts/header/header.component";
import { FooterComponent } from '../layouts/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone:true,
    selector: 'app-front-layout',
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './front-layout.component.html',
    styleUrl: './front-layout.component.scss'
})
export class FrontLayoutComponent {

}
