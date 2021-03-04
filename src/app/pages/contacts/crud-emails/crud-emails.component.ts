import { Component, OnInit } from '@angular/core';
import { EmailModel } from 'src/app/models/contacts/email.model';
import { ContactService } from 'src/app/services/api/contact.service';

@Component({
  selector: 'app-crud-emails',
  templateUrl: './crud-emails.component.html',
  styleUrls: ['./crud-emails.component.scss']
})
export class CrudEmailsComponent implements OnInit {

  panelOpenState = false;

  listEmails: Array<EmailModel>;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.email$.subscribe((emails) => {
      this.listEmails = emails;
    })

    this.contactService.getEmails(); // start
  }

  saveEmail(): void {
    this.listEmails.forEach(email => {
      if (email.id && email.email) {
        this.contactService.updateEmail(email)
      } else if (email.email) {
        this.contactService.saveEmail(email)
      };
    });
  }

  addEmail(): void {
    let newEmail = new EmailModel();
    newEmail.email = "";
    this.listEmails.push(newEmail);
  }

  removeEmail(email: EmailModel, index: number): void {
    if (email.id) {
      this.contactService.deleteEmail(email)
    }
    this.listEmails.splice(index, 1);
  }
}
