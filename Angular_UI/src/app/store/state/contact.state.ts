import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { Mycontact } from 'src/app/mycontact';
import { ContactService } from 'src/app/services/contact.service';
import {
  addcontact,
  deletecontact,
  getcontact,
  getsingalcontact,
  updatecontact,
} from '../actions/contact.action';

export class contactstatemodel {
  contacts: Mycontact[] = [];
  contactloaded: boolean = false;
  selectedcontact: Mycontact = {} as Mycontact;
}

@State<contactstatemodel>({
  name: 'contact',
  defaults: {
    contacts: [],
    contactloaded: false,
    selectedcontact: {} as Mycontact,
  },
})
@Injectable()
export class contactstate {
  constructor(private contactservice: ContactService) {}
  @Selector()
  static getcontacts(state : contactstatemodel) {
    return state.contacts;
  }

  @Selector()
  static contactloaded(stat: contactstatemodel) {
    return stat.contactloaded;
  }

  @Selector()
  static getsingalcontacts(stat: contactstatemodel) {
    return stat.selectedcontact;
  }

  @Action(getsingalcontact)
  setsingalcontact(
    { getState, setState }: StateContext<contactstatemodel>,
    { contactid }: getsingalcontact
  ) {
    const State = getState();
    const contacts = State.contacts;
    const index = contacts.findIndex((contact) => contact.id == contactid);
    if (contacts.length > 0) {
      setState({
        ...State,
        selectedcontact: contacts[index],
      });
    } else {
      this.contactservice
        .getsinglecontact(contactid)
        .subscribe((res: Mycontact) => {
          setState({
            ...State,
            contacts: [res],
            selectedcontact: res,
          });
        });
    }
  }

  @Action(getcontact)
  getcontacts({ getState, setState }: StateContext<contactstatemodel>) {
    return this.contactservice.getallcontacts().pipe(
      tap((res: any) => {
        debugger
        const State = getState();
        setState({
          ...State,
          contacts: res,
          contactloaded: true,
        });
      })
    );
  }

  @Action(addcontact)
  addcontact(
    { getState, patchState }: StateContext<contactstatemodel>,
    { payload }: addcontact
  ) {
    debugger
    return this.contactservice.createcontact(payload).pipe(
      tap((res) => {
        const state = getState();

        patchState({
          contacts: [...state.contacts, res],
        });
      })
    );
  }

  @Action(deletecontact)
  deletecontact(
    { getState, setState }: StateContext<contactstatemodel>,
    { contactid }: deletecontact
  ) {
    return this.contactservice.deletecontact(contactid).pipe(
      tap((res: Mycontact) => {
        const state = getState();
        const filtercontacts = state.contacts.filter(
          (contact) => contact.id != contactid
        );
        setState({
          ...state,
          contacts: filtercontacts,
        });
      })
    );
  }

  @Action(updatecontact)
  updatecontact(
    { getState, patchState }: StateContext<contactstatemodel>,
    { contactid, payload }: updatecontact
  ) {
    return this.contactservice.updatecontact(payload, contactid).pipe(
      tap((res) => {
        const state = getState();
        const emplist = state.contacts;
        const index = emplist.findIndex((contact) => contact.id == contactid);
        emplist[index] = res;
        console.log(emplist);
        patchState({
          contacts: emplist,
        });
      })
    );
  }
}
