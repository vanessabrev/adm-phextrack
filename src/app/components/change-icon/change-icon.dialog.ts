import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as icons from '../../shared/all-icons-material-complete.json';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.dialog.html',
  styleUrls: ['./change-icon.dialog.scss']
})
export class ChangeIconDialog {

  listIcons = icons['default'].icons;
  categories = icons['default'].categories;

  categoryView = 'All';

  constructor(
    public dialogRef: MatDialogRef<ChangeIconDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { icon: string }
  ) { }

  filterListIcons(category: string) {
    let filteredIcons = category === "All"
      ? this.listIcons
      : this.listIcons.filter(icon => icon.categories.indexOf(category) === 0);
    return filteredIcons;
  }

  selectTab(event) {
    this.categoryView = event.tab.textLabel;
  }

  trackBy(index, item) {
    return item.name;
  }

  close(): void {
    this.dialogRef.close();
  }
}
