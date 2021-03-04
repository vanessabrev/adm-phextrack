import { Component, OnInit } from '@angular/core';
import { PhoneModel } from 'src/app/models/contacts/phone.model';
import { ContactService } from 'src/app/services/api/contact.service';

@Component({
  selector: 'app-crud-phones',
  templateUrl: './crud-phones.component.html',
  styleUrls: ['./crud-phones.component.scss']
})
export class CrudPhonesComponent implements OnInit {

  panelOpenState = false;

  listPhones: Array<PhoneModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.phone$.subscribe((phones) => {
      this.listPhones = phones;
    })

    this.contactService.getPhones(); // start
  }

  savePhones(): void {
    this.listPhones.forEach(phone => {
      if (phone.id && phone.phone) {
        this.contactService.updatePhone(phone)
      } else if (phone.phone) {
        this.contactService.savePhone(phone)
      };
    });
  }

  addPhones(): void {
    let newPhone = new PhoneModel();
    newPhone.phone = "";
    this.listPhones.push(newPhone);
  }

  removePhone(phone: PhoneModel, index: number): void {
    if (phone.id) {
      this.contactService.deletePhone(phone)
    }
    this.listPhones.splice(index, 1);
  }
}
