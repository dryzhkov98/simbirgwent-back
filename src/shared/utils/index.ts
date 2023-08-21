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
