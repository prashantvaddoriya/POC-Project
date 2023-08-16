import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css'],
})
export class AddcontactComponent implements OnInit {
  loading: boolean = false;
  errormassage: string | null = null;
  contactForm: FormGroup;
  contact: Mycontact = {} as Mycontact;
  isEnable : boolean = false;
  constructor(
    private contservice: ContactService,
    private route: Router,
    private cForm: FormBuilder
  ) {
    this.contactForm = this.cForm.group({
      contactName: ['', Validators.required ],
      image: ['', Validators.required ],
      email: ['', Validators.required ],
      mobile: ['', Validators.required ],
      company: ['', Validators.required ],
      hobby: ['', Validators.required ],
      address: ['', Validators.required ]
   });
   this.isEnable = this.contactForm.status != 'INVALID'
  }
  ngOnInit(): void {
  }

  addcontact() {
    this.contact.id = 0;
    this.contservice.createcontact(this.contact).subscribe((res) => {
      this.route.navigate(['contacts/admin']);
    });
  }
}
