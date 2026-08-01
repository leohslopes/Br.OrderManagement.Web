import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../../shared/services/message-service';

export const errorInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const messageService = inject(MessageService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = getErrorMessage(error);

      switch (error.status) {
        case 0:
          messageService.error(
            'Não foi possível conectar com a API.',
            'Falha de conexão'
          );
          break;

        case 400:
          messageService.warning(
            message,
            'Validação'
          );
          break;

        case 404:
          messageService.warning(
            message,
            'Não encontrado'
          );
          break;

        case 409:
          messageService.warning(
            message,
            'Conflito'
          );
          break;

        default:
          messageService.error(
            message,
            'Erro na operação'
          );
          break;
      }

      return throwError(() => error);
    })
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string' && error.error.trim()) {
    return error.error;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  if (error.error?.title) {
    return error.error.title;
  }

  if (error.error?.errors) {
    const validationMessages = Object
      .values(error.error.errors)
      .flat()
      .map(value => String(value));

    return validationMessages.join(' ');
  }

  return 'Não foi possível concluir a operação.';
}