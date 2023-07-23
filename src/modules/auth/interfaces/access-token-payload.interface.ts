import { Role } from '@prisma/client';

export interface IAccessTokenPayload {
  sub: string;
  role: Role;
}
