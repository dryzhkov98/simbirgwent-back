import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PRIVATE = 'isPrivate';
export const Auth = (): CustomDecorator => SetMetadata(IS_PRIVATE, true);
