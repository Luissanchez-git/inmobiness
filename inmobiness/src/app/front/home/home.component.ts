import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
register();

@Component({
    standalone:true,
    selector: 'app-home',
    imports: [RouterLink,CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Importante para usar custom elements

})
export class HomeComponent {
  logoUrl: string = 'assets/logo_principal.png';
 slides = [
    { id: 1, title: 'Slide 1', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80' },
    { id: 2, title: 'Slide 2', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
  ];
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
