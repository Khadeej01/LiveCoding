import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService, Client } from '../service/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  clients: Client[] = [];
  currentClient: Client = {} as Client;
  isEditing = false;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  startEdit(client: Client): void {
    this.currentClient = { ...client };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.currentClient = {} as Client;
    this.isEditing = false;
  }

  saveClient(): void {
    if (this.isEditing) {
      this.clientsService.updateClient(this.currentClient.id!, this.currentClient)
        .subscribe(() => {
          this.loadClients();
          this.cancelEdit();
        });
    } else {
      this.clientsService.createClient(this.currentClient)
        .subscribe(() => {
          this.loadClients();
          this.currentClient = {} as Client;
        });
    }
  }

  deleteClient(id: number | undefined): void {
    if (id === undefined) return;
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientsService.deleteClient(id)
        .subscribe(() => {
          this.loadClients();
        });
    }
  }
}
