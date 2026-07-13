import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }
  showSuccess(message:string){ this.messageService.add({ severity: 'success', summary: 'Listo', detail: message });}
  showError (message:string){ this.messageService.add({ severity: 'error', summary: 'Error', detail: message });}

  showConfirmation(question: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        message: question,
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptButtonStyleClass: 'p-button-warn',
        rejectButtonStyleClass: 'p-button-secondary',
 
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => {
          resolve(true); 
        },
        reject: () => {
          resolve(false); // Resuelve como rechazado
        },
      });
    });
  }
}
