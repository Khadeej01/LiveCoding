import { Routes } from '@angular/router';
import { AppComponent} from "./app.component";
import {ClientsComponent} from "./component/clients/clients.component";

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'Client', component: ClientsComponent }


];
