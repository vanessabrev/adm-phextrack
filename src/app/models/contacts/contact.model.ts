import { AddressModel } from "./address.model";
import { EmailModel } from "./email.model";
import { PhoneModel } from "./phone.model";

// Esse modelo sera utilizado no front para tratar as informaceos organizadas em arrays dentro dessa aplicacao.
export class ContactModel {
  address: Array<AddressModel>;
  phones: Array<PhoneModel>;
  emails: Array<EmailModel>;
}

export class ContactViewModel {
  icon: string;
  title: string;
  information: string;
}
