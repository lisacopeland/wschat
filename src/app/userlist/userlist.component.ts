import { Component, Input } from '@angular/core';
import { User } from '../model/user.model';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  @Input() users: User[];

  cols: Column[] = [
    {
      field: 'displayName', header: 'Display Name'
    },
    {
      field: 'createdDate', header: 'Member Since'
    },
    {
      field: 'online', header: 'Status'
    }
  ]
}
