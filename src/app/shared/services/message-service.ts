import { Injectable, signal } from '@angular/core';

import {
  Message,
  MessageType
} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly messagesState = signal<Message[]>([]);
  readonly messages = this.messagesState.asReadonly();
  private sequence = 0;

  success(text: string, title = 'Sucesso'): void {
    this.show('success', title, text);
  }

  warning(text: string, title = 'Atenção'): void {
    this.show('warning', title, text);
  }

  error(text: string, title = 'Erro'): void {
    this.show('error', title, text);
  }

  info(text: string, title = 'Informação'): void {
    this.show('info', title, text);
  }

  remove(id: number): void {
    this.messagesState.update(messages =>
      messages.filter(message => message.id !== id)
    );
  }

  clear(): void {
    this.messagesState.set([]);
  }

  private show(
    type: MessageType,
    title: string,
    text: string
  ): void {
    const id = ++this.sequence;

    this.messagesState.update(messages => [
      ...messages,
      {
        id,
        type,
        title,
        text
      }
    ]);

    window.setTimeout(() => {
      this.remove(id);
    }, 5000);
  }
}