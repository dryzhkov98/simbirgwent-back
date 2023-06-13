export function getHttpMessage(status: number): string {
  switch (status) {
    case 404:
      return 'Page not found';
    case 400:
      return 'Missing params';
    case 401:
      return 'User not authorized';
    case 403:
      return 'User has no rules';
    default:
      return 'Internal server errror, request later';
  }
}
