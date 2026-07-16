export function getAppBaseUrl(request?: Request): string {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (request) {
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');

    if (host) {
      return `${proto}://${host}`.replace(/\/$/, '');
    }
  }

  return 'http://localhost:3000';
}
