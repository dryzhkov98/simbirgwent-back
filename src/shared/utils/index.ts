import { ValidationError } from 'class-validator';
import chalk from 'chalk';

export function formatErrorMessage(errors: ValidationError[]): string {
  return (
    '\n' +
    errors
      .map((err) => {
        return chalk.red(
          `${chalk.bold(err.property)}: ${Object.values(
            err.constraints ?? {},
          ).join(', ')}`,
        );
      })
      .join('\n')
  );
}

export function hidePassword<T extends object>(obj: T): Omit<T, 'password'> {
  if ('password' in obj) {
    const { password: _password, ...withoutPassword } = obj;
    return withoutPassword;
  }
  return obj;
}
