import { Mycontact } from 'src/app/mycontact';
export class getcontact {
  static readonly type = '[contact] get';
}

export class getsingalcontact {
  static readonly type = '[employee] set';
  constructor(public contactid: string) {}
}

export class addcontact {
  static readonly type = '[contact] add';
  constructor(public payload: Mycontact) {}
}

export class updatecontact {
  static readonly type = '[contact] update';
  constructor(public contactid: string, public payload: Mycontact) {}
}

export class deletecontact {
  static readonly type = '[contact] delete';
  constructor(public contactid: string) {}
}
