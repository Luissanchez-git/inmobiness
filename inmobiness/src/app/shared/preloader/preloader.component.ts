import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
    standalone:true,
    selector: 'app-preloader',
    imports: [ProgressBarModule, NgClass],
    templateUrl: './preloader.component.html',
    styleUrl: './preloader.component.scss'
})
export class PreloaderComponent implements OnInit{
  ngOnInit(): void {
    let progress:any= document.querySelector(".p-progressbar-value")
  }
}
