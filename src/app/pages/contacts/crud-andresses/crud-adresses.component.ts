import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'src/app/models/contacts/address.model';
import { ContactService } from 'src/app/services/api/contact.service';

@Component({
  selector: 'app-crud-adresses',
  templateUrl: './crud-adresses.component.html',
  styleUrls: ['./crud-adresses.component.scss']
})
export class CrudAdressesComponent implements OnInit {

  listAdresses: Array<AddressModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.adresse$.subscribe((adresses) => {
      this.listAdresses = adresses;
      console.log('this.listAdresses', this.listAdresses)
    })

    this.contactService.getAdresses(); // start
  }
}
