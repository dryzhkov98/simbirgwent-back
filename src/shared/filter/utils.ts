import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from './constants';

export function getHttpMessage(status: number): string {
  switch (status) {
    case 404:
      return NOT_FOUND;
    case 400:
      return BAD_REQUEST;
    case 401:
      return UNAUTHORIZED;
    case 403:
      return FORBIDDEN;
    default:
      return INTERNAL_SERVER_ERROR;
  }
}
