import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../service/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientForm: FormGroup;
  selectedClient: any = null;
  displayedColumns: string[] = ['id', 'nom', 'email', 'telephone', 'actions'];

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      nom: [''],
      email: [''],
      telephone: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('Erreur:', err)
    });
  }

  saveClient(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id, this.clientForm.value).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (err) => console.error('Erreur:', err)
      });
    } else {
      this.clientService.createClient(this.clientForm.value).subscribe({
        next: () => {
          this.loadClients();
          this.resetForm();
        },
        error: (err) => console.error('Erreur:', err)
      });
    }
  }

  editClient(client: any): void {
    this.selectedClient = client;
    this.clientForm.patchValue(client);
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe({
      next: () => this.loadClients(),
      error: (err) => console.error('Erreur:', err)
    });
  }

  resetForm(): void {
    this.selectedClient = null;
    this.clientForm.reset();
  }
}
