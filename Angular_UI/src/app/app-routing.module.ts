import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ContactmanagerComponent } from './components/contactmanager/contactmanager.component';
import { UpdatecontactComponent } from './components/updatecontact/updatecontact.component';
import { ViewcontactComponent } from './components/viewcontact/viewcontact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts/admin', pathMatch: 'full' },
  { path: 'contacts/admin', component: ContactmanagerComponent },
  { path: 'contacts/add', component: AddcontactComponent },
  { path: 'contacts/view/:contactid', component: ViewcontactComponent },
  { path: 'contacts/update/:contactid', component: UpdatecontactComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
