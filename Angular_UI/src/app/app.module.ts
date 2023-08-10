import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ViewcontactComponent } from './components/viewcontact/viewcontact.component';
import { UpdatecontactComponent } from './components/updatecontact/updatecontact.component';
import { ContactmanagerComponent } from './components/contactmanager/contactmanager.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipe/search.pipe';

// ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { contactstate } from './store/state/contact.state';

@NgModule({
  declarations: [
    AppComponent,

    AddcontactComponent,
    ViewcontactComponent,
    UpdatecontactComponent,
    ContactmanagerComponent,
    NavBarComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //ngxs
    NgxsModule.forRoot([contactstate]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
