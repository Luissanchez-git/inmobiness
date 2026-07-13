import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-rentar',
  imports: [RouterLink],
  templateUrl: './rentar.component.html',
  styleUrl: './rentar.component.scss'
})
export class RentarComponent {
typeSelection:string = "Renta";

}
