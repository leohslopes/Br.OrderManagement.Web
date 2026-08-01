export type MessageType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface Message {
  id: number;
  type: MessageType;
  title: string;
  text: string;
}