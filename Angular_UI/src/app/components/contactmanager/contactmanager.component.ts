import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';
import {
  deletecontact,
  getcontact,
} from 'src/app/store/actions/contact.action';
import { contactstate } from 'src/app/store/state/contact.state';

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
  constructor(private contsservice: ContactService, private store: Store) {}
  @Select(contactstate.getcontacts) contacts$:
    | Observable<Mycontact[]>
    | undefined;

  @Select(contactstate.contactloaded) contactloaded$:
    | Observable<boolean>
    | undefined;

  ngOnInit(): void {
    this.getallcontactdata();
    this.contacts$?.subscribe((res) => {
      debugger
      this.contacts = res;
    });
  }

  getallcontactdata() {
    this.contactloaded$?.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new getcontact());
      }
    });
  }

  deletecontact(contectid: number) {
    if (contectid) {
      this.store.dispatch(new deletecontact(contectid));

    }
  }
}
