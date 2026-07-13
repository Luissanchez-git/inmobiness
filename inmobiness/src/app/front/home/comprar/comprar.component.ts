import { Component } from '@angular/core';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-comprar',
  imports: [RouterLink],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.scss'
})
export class ComprarComponent {
typeSelection:string="compra"


constructor(private route:ActivatedRoute){}



}
