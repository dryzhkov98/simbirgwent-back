import { Request } from 'express';
import { REQUEST_USER_KEY } from '../auth.constants';
import { IAccessTokenPayload } from './access-token-payload.interface';

export interface ICustomRequest extends Request {
  [REQUEST_USER_KEY]?: IAccessTokenPayload;
}
