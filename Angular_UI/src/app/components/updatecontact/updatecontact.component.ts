import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Mycontact } from 'src/app/mycontact';
import { Mygroup } from 'src/app/mygroup';
import { ContactService } from 'src/app/services/contact.service';
import { updatecontact } from 'src/app/store/actions/contact.action';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css'],
})
export class UpdatecontactComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contact: Mycontact = {} as Mycontact;
  contactid: string | null = null;
  groups: Mygroup[] = [];
  constructor(
    private contservice: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.contactid = params.get('contactid');
    });

    if (this.contactid) {
      this.contservice.getsinglecontact(Number(this.contactid)).subscribe(
        (data: any) => {
          this.loading = true;
          this.contact = data;
          // this.contservice.getallgroups().subscribe((data: any) => {
          //   this.groups = data;
          // });
          this.loading = false;
        },
        (error) => {
          this.errormassage = error;
          this.loading = false;
        }
      );
    }
  }

  updatecontact() {
    if (this.contactid) {
      this.store.dispatch(new updatecontact(Number(this.contactid), this.contact));
      setTimeout(() => {
        this.router.navigate(['contacts/admin']);
      }, 500);
    }
  }
}
