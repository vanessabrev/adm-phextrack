import { Component, OnInit } from '@angular/core';
import { EmailModel } from 'src/app/models/contacts/email.model';
import { ContactService } from 'src/app/services/api/contact.service';

@Component({
  selector: 'app-crud-emails',
  templateUrl: './crud-emails.component.html',
  styleUrls: ['./crud-emails.component.scss']
})
export class CrudEmailsComponent implements OnInit {

  listEmails: Array<EmailModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.email$.subscribe((emails) => {
      this.listEmails = emails;
      console.log('this.listEmails', this.listEmails)
    })

    this.contactService.getEmails(); // start
  }
}
