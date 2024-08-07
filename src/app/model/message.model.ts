
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
export class UserMessage {
  id?: string;
  userName?: string;
  message?: string;
  messageDate?: Date;
  displayName?: string;
  online?: boolean;

  constructor(defaultValues: Partial<UserMessage>) {
    Object.keys(defaultValues).forEach((key) => {
      this[key] = defaultValues[key];
    });
  }
}

export function mapFromWsMessage(data: any): UserMessage {
  return {
    id: data.Id,
    message: data.Message,
    userName: data.UserName,
    messageDate: new Date(Date.parse(data.MessageDate))
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
