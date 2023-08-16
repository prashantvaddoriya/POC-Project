import { Component, OnInit } from '@angular/core';
import {  tap } from 'rxjs';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contactmanager',
  templateUrl: './contactmanager.component.html',
  styleUrls: ['./contactmanager.component.css'],
})
export class ContactmanagerComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contacts: Mycontact[] = [];
  searchcontact: string = '';
  isAscendingSort: Boolean = true;
  constructor(private contsservice: ContactService) { }

  ngOnInit(): void {
    this.getallcontactdata();
  }

  getallcontactdata() {
    this.contsservice.getallcontacts().pipe(
      tap((res: any) => res)).subscribe((res) => {
        this.contacts = res;
      });
  }

  deletecontact(contectid: number) {
    debugger
    if (contectid) {
      this.contsservice.deletecontact(contectid).subscribe(
        (res: Mycontact) => this.getallcontactdata());
    }
  }
}
