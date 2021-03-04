import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'src/app/models/contacts/address.model';
import { ContactService } from 'src/app/services/api/contact.service';
import * as listUfs from '../../../shared/list-uf.json';

@Component({
  selector: 'app-crud-adresses',
  templateUrl: './crud-adresses.component.html',
  styleUrls: ['./crud-adresses.component.scss']
})
export class CrudAdressesComponent implements OnInit {

  panelOpenState = false;
  listUfs: Array<{ nome: string, sigla: string }> = listUfs.ufs;

  listAdresses: Array<AddressModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.adresse$.subscribe((adresses) => {
      this.listAdresses = adresses;
    })

    this.contactService.getAdresses(); // start
  }

  saveAddress(): void {
    this.listAdresses.forEach(address => {
      if (address.id) {
        this.contactService.updateAddress(address)
      } else if (address.postalCode) {
        this.contactService.saveAddress(address)
      };
    });
  }

  addAddress(): void {
    let newAddress = new AddressModel();
    this.listAdresses.push(newAddress);
  }

  removeAddress(address: AddressModel, index: number): void {
    if (address.id) {
      this.contactService.deleteAddress(address)
    }
    this.listAdresses.splice(index, 1);
  }
}
