import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Mycontact } from 'src/app/mycontact';
import { Mygroup } from 'src/app/mygroup';
import { ContactService } from 'src/app/services/contact.service';
import { getsingalcontact } from 'src/app/store/actions/contact.action';
import { contactstate } from 'src/app/store/state/contact.state';

@Component({
  selector: 'app-viewcontact',
  templateUrl: './viewcontact.component.html',
  styleUrls: ['./viewcontact.component.css'],
})
export class ViewcontactComponent implements OnInit {
  contactid: number = 0;
  contact = {} as Mycontact;
  loading: boolean = false;
  errormassage: string | null = null;
  mygroup: Mygroup = {} as Mygroup;

  constructor(
    private route: ActivatedRoute,
    private contservice: ContactService,
    private store: Store
  ) {}

  @Select(contactstate.getsingalcontacts)
  singalcontact$!: Observable<Mycontact>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.contactid = Number(param.get('contactid'));
    });

    this.getsingalcontact();
    setTimeout(() => {
      // this.contservice.getgroup(this.contact).subscribe((data: Mygroup) => {
      //   this.mygroup = data;
      // });
    }, 100);
  }

  getsingalcontact() {
    this.store.dispatch(new getsingalcontact(this.contactid));

    this.singalcontact$?.subscribe((res) => {
      this.contact = res;
      console.log(res);
    });
  }
}
