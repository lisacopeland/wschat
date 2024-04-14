export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
export class UserMessage {
  userName: string;
  message: string;
  messageDate: Date;

  constructor(defaultValues: Partial<UserMessage>) {
    Object.keys(defaultValues).forEach((key) => {
      this[key] = defaultValues[key];
    });
  }

  clone() {
    return new UserMessage(deepCopy(this));
  }
}

export function mapToUserMessage(data: any): UserMessage {
  return new UserMessage(data);
}
export function mapToUserMessages(data: any[]): UserMessage[] {
  if (data !== undefined && data.length) {
    const allData = data.map(mapToUserMessage);
    return allData;
  } else {
    return [];
  }
}