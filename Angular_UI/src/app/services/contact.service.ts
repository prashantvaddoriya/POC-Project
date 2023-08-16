import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Mycontact } from '../mycontact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private baseurl: string = `https://localhost:44309/api/Contact`;
//https://poc-dotnet.azurewebsites.net/api/Contact
  getallcontacts(): Observable<Mycontact> {
    let dataurl: string = `${this.baseurl}/GetContacts`;
    return this.http.get<Mycontact>(dataurl).pipe(catchError(this.handleError));
  }

  getsinglecontact(contactid: number): Observable<Mycontact> {
    let dataurl = `${this.baseurl}/GetContactByID/${contactid}`;
    return this.http.get<Mycontact>(dataurl).pipe(catchError(this.handleError));
  }

  createcontact(contact: Mycontact): Observable<Mycontact> {
    let dataurl = `${this.baseurl}/AddContact`;
    return this.http
      .post<Mycontact>(dataurl, contact)
      .pipe(catchError(this.handleError));
  }

  updatecontact(contact: Mycontact, contactid: number): Observable<Mycontact> {
    let dataurl = `${this.baseurl}/UpdateContact`;
    contact.id = contactid;
    return this.http
      .put<Mycontact>(dataurl, contact)
      .pipe(catchError(this.handleError));
  }

  deletecontact(contactid: number): Observable<Mycontact> {
    let dataurl = `${this.baseurl}/DeleteContact/${contactid}`;
    return this.http
      .delete<Mycontact>(dataurl)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errormassage: string = '';
    if (error.error instanceof ErrorEvent) {
      //client error
      errormassage = `error : ${error.error.message}`;
    } else {
      //server side error
      errormassage = `status : ${error.status} \n Massage: ${error.message}`;
    }
    return throwError(errormassage);
  }
}
