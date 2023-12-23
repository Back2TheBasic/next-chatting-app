export interface IMessage {
  id: string;
  fromName: string;
  text: string;
  fromUid: string;
  toName: string;
  toUid: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
