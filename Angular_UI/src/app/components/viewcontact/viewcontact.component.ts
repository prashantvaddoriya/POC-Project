import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';

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

  constructor(
     private route: ActivatedRoute,
    private contactservice: ContactService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
       this.contactid = Number(param.get('contactid'));
    });
     this.getsingalcontact();
  }

  getsingalcontact() {

    this.contactservice
        .getsinglecontact(this.contactid)
        .subscribe((res: Mycontact) => {
          debugger
          this.contact = res;
        });
  }
}
