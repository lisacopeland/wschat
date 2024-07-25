export class User {
  id?: string;
  email?: string;
  userName?: string;
  displayName?: string;
  createdDate?: Date;
  online?: boolean;

  constructor(defaultValues: Partial<User>) {
    Object.keys(defaultValues).forEach((key) => {
      if (key === 'createdDate') {
        const str = defaultValues[key].toString();
       this[key] = new Date(Date.parse(str))
      } else {
        this[key] = defaultValues[key];
      }
    });
  }
}

export function mapFromWsUser(data: any): User {
  return {
    id: data.Id,
    email: data.Email,
    userName: data.UserName,
    online: data.Online,
    displayName: data.DisplayName,
    createdDate: new Date(Date.parse(data.CreatedDate))
  }
}

export function mapToUser(data: any): User {
  return new User(data);
}
export function mapToUsers(data: any[]): User[] {
  if (data !== undefined && data.length) {
    const allData = data.map(mapToUser);
    return allData;
  } else {
    return [];
  }
}
