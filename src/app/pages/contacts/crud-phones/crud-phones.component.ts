import { Component, OnInit } from '@angular/core';
import { PhoneModel } from 'src/app/models/contacts/phone.model';
import { ContactService } from 'src/app/services/api/contact.service';

@Component({
  selector: 'app-crud-phones',
  templateUrl: './crud-phones.component.html',
  styleUrls: ['./crud-phones.component.scss']
})
export class CrudPhonesComponent implements OnInit {

  listPhones: Array<PhoneModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.phone$.subscribe((phones) => {
      this.listPhones = phones;
      console.log('this.listPhones', this.listPhones)
    })

    this.contactService.getPhones(); // start
  }
}
