export class User {
  _id?: string;
  email?: string;
  userName?: string;
  displayName?: string;
  createdDate?: Date;
  onLine?: boolean;

  constructor(defaultValues: Partial<User>) {
    Object.keys(defaultValues).forEach((key) => {
      this[key] = defaultValues[key];
    });
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
