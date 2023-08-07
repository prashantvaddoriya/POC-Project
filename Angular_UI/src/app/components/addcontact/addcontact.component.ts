import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Mycontact } from 'src/app/mycontact';
import { Mygroup } from 'src/app/mygroup';
import { ContactService } from 'src/app/services/contact.service';
import { addcontact } from 'src/app/store/actions/contact.action';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
})
export class AddcontactComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contact: Mycontact = {} as Mycontact;
  groups: Mygroup[] = [];
  constructor(
    private contservice: ContactService,
    private route: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.contservice.getallgroups().subscribe(
    //   (data: any) => {
    //     this.groups = data;
    //   },
    //   (error) => (this.errormassage = error)
    // );
  }

  addcontact() {
    this.contact.id = 0;
    this.store.dispatch(new addcontact(this.contact));

    this.route.navigate(['']);
  }
}
